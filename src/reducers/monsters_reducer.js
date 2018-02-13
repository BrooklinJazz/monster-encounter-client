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
  limitMonsterHpChange
} from "../../helpers"
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
  players: []
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
    return {
      ...state,
      CombatantList: state.CombatantList.concat(newCombatant)
    };
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
    case Types.REMOVE_COMBATANT:
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
    case Types.CHANGE_MONSTER_HP:
    // NOTE DEBUG this function works, but when it changes the value of combatant.currentHp it may be pointing to the original state and mutating it.
    const combatantsListAfterChange = state.CombatantList.map( (combatant, i) => {
      return limitMonsterHpChange(i, combatant, action.payload)
    })
    return {
      ...state,
      CombatantList: combatantsListAfterChange
    }
    case Types.CLEAR_COMBATANTS:
    return {
      ...state,
      CombatantList: []
    }
    case Types.ROLL_INITIATIVES:
    const newCombatantList = [...state.CombatantList]
    const combatantsAfterInitiativeRoll = newCombatantList.map( monster => {
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
    // console.log('RENDER_SAVED_COMBAT', action.payload);
    return {
      ...state,
      CombatantList: action.payload
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
    case Types.D20_ROLLED:
    console.log(action.payload);
    if (parseInt(action.payload) >= 0) {
      modifier = parseInt(action.payload)
      toBeRolled = `(1d20 + ${modifier})`
      console.log(modifier);
      const dtwenty = d20()
      roll = `[${dtwenty}] + ${modifier}`
      result = modifier + dtwenty
      newRoll = {rolled: toBeRolled, roll, result}
      return {
        ...state,
        rolls: state.rolls.concat(newRoll)
      }
    } else if(parseInt(action.payload) < 0) {
      modifier = parseInt(0 - action.payload)
      toBeRolled = `(1d20 - ${modifier})`
      const dtwenty = d20()
      roll = `[${dtwenty}] - ${modifier}`
      result = dtwenty - modifier
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
      newSidedRoll = {rolled: action.payload, roll: rollArrayString, result: rollArrayReduced}
      // console.log('newRoll', newSidedRoll);
    } else if (modifier <= 0) {
      modifier = 0 - modifier
      numberOfDice = getNumberOfDice(toBeRolled)
      // the type of dice rolled. i.e. (2d6) will return 6
      sidesOfDice = getSidesOfDice(toBeRolled)
      // the type of dice rolled. i.e. (2d6 + 5) will return 5
      // returns roll in format "1,3"
      rollArray = rollSidedDice(numberOfDice, sidesOfDice)
      // roll converted from "1,3" to "[1,3] + 3"
      rollArrayString = `[${rollArray}] - ${modifier}`
      // result the sum of rollArray plus modifier
      rollArrayReduced = parseInt(rollArray.reduce((a, b) => a + b, 0)) - parseInt(modifier)
      // the object to be added to the redux store in rolls:
      newSidedRoll = {rolled: action.payload, roll: rollArrayString, result: rollArrayReduced}
      // console.log('newRoll', newSidedRoll);
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
    // console.log('UPDATE FIGHTS', action.payload);
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
