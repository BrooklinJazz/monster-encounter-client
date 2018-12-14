// state argument is not application state, only the state
// this reducer is responsible for tasks relating to monsters
import monstersData from "../data/monsters";
import Types from "../types";
import CombatantList from "../containers/CombatantList";
import {
  d20,
  deepClone,
  convScoreToMod,
  getNumberOfDice,
  getSidesOfDice,
  getModifier,
  rollSidedDice,
  limitMonsterHpChange,
  flatten
} from "../helpers"
import { log } from "util";
// the array of monster objects exported as a function.
// NOTE storing monsters in a local file currently
const monsters = monstersData()

const INITIAL_STATE = {
  monsters: [],
  selectedMonster: null,
  CombatantList: [],
  searchTerm: '',
  rolls: [],
  fights: [],
  players: [],
  GroupMonsters: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Select combatant to show detailed stats
    // coming from Combatant.js
    case Types.FETCH_MONSTERS:
    return {
      ...state,
      monsters: action.payload
    }
    /****************************************
    MonsterList
    ****************************************/
    case Types.MONSTER_SELECTED:
    return { ...state, selectedMonster: action.combatant };

    // add a Monster obj to the CombatantList
    case Types.ADD_MONSTER_TO_COMBATANTS:
    newCombatant = deepClone(action.monster);
    // add the currentHp to combatant object to show current/max health
    newCombatant.currentHp = newCombatant.HP.Value
    if (!!state.GroupMonsters && newCombatant.Challenge) {
      newCombatantList = [...state.CombatantList]
      const combatantListAfterAddingCombatantToGroup = newCombatantList.map( monster => {
        if (!!monster.Group) {
          monster.Combatants = monster.Combatants.concat(newCombatant)
          return monster
        } else {
          return monster
        }
      })


      return {
        ...state,
        CombatantList: combatantListAfterAddingCombatantToGroup
      }
    } else {
      return {
        ...state,
        CombatantList: state.CombatantList.concat(newCombatant)
      };
    }
    case Types.FILTER_MONSTER_LIBRARY:
    return {
      ...state,
      searchTerm: action.searchTerm
    };
    /****************************************
    Players
    ****************************************/
    case Types.FETCH_PLAYERS:
    return {
      ...state,
      players: action.payload
    }
    /****************************************
    CombatantList
    ****************************************/
    // Variable names to be used:
    // a deepClone of the current combatant
    let newCombatant
    let newCombatantList
    case Types.REMOVE_COMBATANT:
    newCombatantList = [...state.CombatantList]
    if (state.GroupMonsters && !!action.payload.fromGrouped) {
      const combatantsListAfterRemove = newCombatantList.map((combatantGroup) => {
        if (combatantGroup.Group) {
          let combatantsArrayAfterRemove = combatantGroup.Combatants.filter( (combatant) => (
            action.payload.index !== combatantGroup.Combatants.indexOf(combatant)
        ))
          console.log('Combatants Array After', combatantsArrayAfterRemove);
          
          return {
            ...combatantGroup,
            Combatants: combatantsArrayAfterRemove
          }
        }
        return combatantGroup
      })
      return {
        ...state,
        CombatantList: combatantsListAfterRemove
      }
    }
    // assign a constant to be equal to CombatantList.
    // using map to avoid mutating state.
    const combatantsListAfterRemove = state.CombatantList.map( (combatant, i) => {
      return combatant
    })
    // remove the combatant at the index given by the action
    combatantsListAfterRemove.splice(action.payload.index, 1)
    // return the CombatantList with the desired combatant removed
    return {
      ...state,
      CombatantList: combatantsListAfterRemove
    };
    case Types.CHANGE_COMBATANT_HP:
    newCombatantList = [...state.CombatantList]
    if (state.GroupMonsters && !!action.payload.fromGrouped) {
      // NOTE this would have to be adjusted to expect multiple groups in the future
      // find grouped combatants
      const GroupedCombatants = newCombatantList.find( combatantGroup => { !!combatantGroup.Group})
      // find combatant at action.payload.index
      const combatantsListAfterDamageChange = newCombatantList.map((combatantGroup, index) => {
        if (combatantGroup.Group) {
          combatantGroup.Combatants = combatantGroup.Combatants.map( (combatant, index) => {
            if (index === action.payload.index) {
              return limitMonsterHpChange(index, combatant, action.payload)
            } else {
              return combatant
            }
          })
          return combatantGroup
        }
        return combatantGroup
      })
      // reduce combatant health by action.payload.hpChange, limit the reduction
      // return after changes
      return {
        ...state,
        CombatantList: combatantsListAfterDamageChange
      }
      
    }
    const combatantsListAfterDamageChange = state.CombatantList.map( (combatant, i) => {
      return limitMonsterHpChange(i, combatant, action.payload)
    })
    return {
      ...state,
      CombatantList: combatantsListAfterDamageChange
    }
    case Types.CHANGE_COMBATANT_INITIATIVE:
    newCombatantList = [...state.CombatantList]
    const combatantsListAfterInitiativeChange = newCombatantList.map( (combatant, i) => {
      if (i == action.payload.index) {
        action.payload.combatant.InitiativeRoll = action.payload.initiativeChange
        return action.payload.combatant
      } else {
        return combatant
      }
    })
    combatantsListAfterInitiativeChange.sort(function(a, b) {
      return b.InitiativeRoll - a.InitiativeRoll
    })
    return {
      ...state,
      CombatantList: combatantsListAfterInitiativeChange
    }
    case Types.CLEAR_COMBATANTS:
    return {
      ...state,
      CombatantList: []
    }
    case Types.ROLL_INITIATIVES:
    newCombatantList = [...state.CombatantList]
    const combatantsAfterInitiativeRoll = newCombatantList.map( monster => {
      if (monster.Group) {
        monster.Combatants = monster.Combatants.map( combatant => {
          return {
            ...combatant,
            InitiativeRoll: d20() + convScoreToMod(combatant.Abilities.Dex)
          }
        })

        return {
          ...monster,
          // May want to add a modifier for the group of monsters
          InitiativeRoll: d20()
        }
      }
      return {
        ...monster,
        InitiativeRoll: d20() + convScoreToMod(monster.Abilities.Dex)
      }
      // below was replaced with the above because the deeper values of each monster object
      // were pointing to redux state. this was causing rendering issues and mutation of
      // state.
      // monster.InitiativeRoll = d20() + convScoreToMod(monster.Abilities.Dex)
      // return monster
    }).sort(function(a, b) {
      return b.InitiativeRoll - a.InitiativeRoll
    })
    return {
      ...state,
      CombatantList: combatantsAfterInitiativeRoll
    }
    case Types.RENDER_SAVED_COMBAT:
    return {
      ...state,
      CombatantList: action.payload
    }
    case Types.TOGGLE_GROUPING_MONSTERS:
    // re-organize CombatantList to have a grouped object with it's own InitiativeRoll
    // property
    if (!!action.payload) {
      newCombatantList = [...state.CombatantList]
      const groupedMonsters = {InitiativeRoll: d20(), Combatants: [], Group: true}
      groupedMonsters.Combatants = newCombatantList.filter( monster => {
        if (monster.Challenge) {
          return monster
        }
      })
      const ungroupedMonsters = newCombatantList.filter( monster => {
        if (!monster.Challenge) {
          return monster
        }
      })
      const combatantListAfterGrouping = ungroupedMonsters.concat(groupedMonsters)

      return {
        ...state,
        GroupMonsters: action.payload,
        CombatantList: combatantListAfterGrouping
      }
    } else {
      newCombatantList = [...state.CombatantList]
      const combatantListBeforeFlattening = newCombatantList.map( monster => {
        if (!!monster.Group) {
          return monster.Combatants
        } else {
          return monster
        }
      })
      const combatantListAfterFlattening = flatten(combatantListBeforeFlattening)

      return {
        ...state,
        GroupMonsters: action.payload,
        CombatantList: combatantListAfterFlattening


      }
    }

    /****************************************
    Rolls
    ****************************************/
    // variable names that will be used more than once:

    // a string in the form of a dice expression such as (1d6 + 2)
    let toBeRolled
    // the result of to be rolled show in a string that looks like an array
    // i.e. [4] + 2
    let roll
    // the sum of the roll. i.e. 6
    let result
    // the newRoll object concatinated with the rolls array in redux store
    let newRoll
    let modifier
    let numberOfDice
    let sidesOfDice
    let rollArray
    let rollArrayString
    let rollArrayReduced
    let newSidedRoll
    let dtwenty
    // this case creates a new Roll Component to be shown using the redux store for rolls. payload should be given in form similar to +5, or +12, or -6, or -13
    case Types.D20_ROLLED:
    // if the payload is positive
    if (parseInt(action.payload) >= 0) {
      // convert payload to be integer as modifier
      modifier = parseInt(action.payload)
      // toBeRolled expression for Roll Component
      toBeRolled = `(1d20 + ${modifier})`
      // a random number (roll) between 1 and 20
      dtwenty = d20()
      // show the number rolled for dtwenty
      roll = `[${dtwenty}] + ${modifier}`
      // set result i.e. [5] + 6, result = 11
      result = modifier + dtwenty
      // set the newRoll object to be added to rolls state
      newRoll = {
        rolled: toBeRolled,
        roll,
        result
      }
      return {
        ...state,
        rolls: state.rolls.concat(newRoll)
      }
      // if the payload is negative
    } else if(parseInt(action.payload) < 0) {
      // convert the roll to a positive number for
      // ease of math. i.e. -5 becomes 5
      modifier = parseInt(0 - action.payload)
      // the expression to be rolled i.e. (1d20 + 5)
      toBeRolled = `(1d20 - ${modifier})`
      // a random number between 1 and 20
      const dtwenty = d20()
      // the expression after rolling i.e. [5] + 5
      roll = `[${dtwenty}] - ${modifier}`
      // the result of the roll i.e. [5] + 5, result = 10
      result = dtwenty - modifier
      // the newRoll object the be added to the rolls state.
      newRoll = {rolled: toBeRolled, roll, result}
      return {
        ...state,
        rolls: state.rolls.concat(newRoll)
      }
    }
    case Types.DELETE_ROLL:
    const rollsAfterDelete = state.rolls.map( (roll, i) => {
      return roll
    })
    rollsAfterDelete.splice(action.payload, 1)
    return {
      ...state,
      rolls: rollsAfterDelete
    }
    case Types.SIDED_DICE_ROLLED:
    toBeRolled = action.payload
    modifier = getModifier(toBeRolled)
    // if the modifier is positive
    if (modifier >= 0) {
      // the number of dice rolled i.e (2d6) will return 2
      numberOfDice = getNumberOfDice(toBeRolled)
      // the type of dice rolled. i.e. (2d6) will return 6
      sidesOfDice = getSidesOfDice(toBeRolled)
      // the type of dice rolled. i.e. (2d6 + 5) will return 5
      // returns roll in format "1,3"
      rollArray = rollSidedDice(numberOfDice, sidesOfDice)
      // roll converted from "1,3" to "[1,3] + 3"
      rollArrayString = `[${rollArray}] + ${modifier}`
      // result the sum of rollArray plus modifier
      rollArrayReduced = parseInt(rollArray.reduce((a, b) => a + b, 0)) + parseInt(modifier)
      // the object to be added to the redux store in rolls:
      newSidedRoll = {
        rolled: action.payload,
        roll: rollArrayString,
        result: rollArrayReduced
      }
      // if the modifier is negative
    } else if (modifier <= 0) {
      // set the modifier to a positive value
      // for ease of math
      modifier = 0 - modifier
      // the number of dice rolled, i.e. (2d6) will return 2
      numberOfDice = getNumberOfDice(toBeRolled)
      // the type of dice rolled. i.e. (2d6) will return 6
      sidesOfDice = getSidesOfDice(toBeRolled)
      // returns roll in format "1,3"
      rollArray = rollSidedDice(numberOfDice, sidesOfDice)
      // roll converted from "1,3" to "[1,3] + 3"
      rollArrayString = `[${rollArray}] - ${modifier}`
      // result the sum of rollArray plus modifier
      rollArrayReduced = parseInt(rollArray.reduce((a, b) => a + b, 0)) - parseInt(modifier)
      // the object to be added to the redux store in rolls:
      newSidedRoll = {
        rolled: action.payload,
        roll: rollArrayString,
        result: rollArrayReduced
      }
    }
    return {
      ...state,
      rolls: state.rolls.concat(newSidedRoll)
    }
    case Types.CLEAR_ROLLS:
    return {
      ...state,
      rolls: []
    }
    /****************************************
    Rolls
    ****************************************/
    case Types.UPDATE_FIGHTS:
    return {
      ...state,
      fights: action.payload
    }

  }
  return state;
}

// const filterMonsters = ((monsters) => (searchTerm) => {
//   if (searchTerm) {
//     return monsters.filter((monster) => {
//       return monster.Name.includes(searchTerm)
//     })
//   }
//   return monsters
// })(monsters)
// immediate function

// add new case and type
// when the types, dispatch and action that is the correct action type with the payload
// and the current text
