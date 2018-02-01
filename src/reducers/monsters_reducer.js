// state argument is not application state, only the state
// this reducer is responsible for tasks relating to monsters
import monstersData from "../data/monsters";
import Types from "../types";
import CombatantList from "../containers/CombatantList";
import {
  d20,
  deepClone,
  getNumberOfDice,
  getSidesOfDice,
  getModifier,
  rollSidedDice
} from "../../helpers"
// the array of monster objects exported as a function.
// NOTE storing monsters in a local file currently
const monsters = monstersData()

const INITIAL_STATE = {
  monsters,
  selectedMonster: null,
  CombatantList: [],
  searchTerm: '',
  rolls: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Select combatant to show detailed stats
    // coming from Combatant.js
    /****************************************
    MonsterList
    ****************************************/
    case Types.MONSTER_SELECTED:
    return { ...state, selectedMonster: action.combatant };
    // add a Monster obj to the CombatantList
    case Types.ADD_MONSTER_TO_COMBATANTS:
    const newCombatant = deepClone(action.monster);
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
    CombatantList
    ****************************************/
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
    const combatantsListAfterChange = state.CombatantList.map( (combatant, i) => {
      if (i !== action.payload.index || isNaN(action.payload.hpChange) ) {
        // if the input given by hpChange is not a number
        // or the index of the current monster doesn't match
        // the expected index of payload: return the combatant as it is
        return combatant

        // if healing applied to monster brings it above max health
      } else if (action.payload.combatant.currentHp - action.payload.hpChange > action.payload.combatant.HP.Value) {
        // set currentHp to maxHp `action.payload.combatant.HP.Value`
        action.payload.combatant.currentHp = action.payload.combatant.HP.Value
        // return the combatant with max hp
        return action.payload.combatant

      } else if (action.payload.combatant.currentHp - action.payload.hpChange < 0) {
        action.payload.combatant.currentHp = 0
        return action.payload.combatant
      } else {
        // we are applying damage to the combatant so positive numbers reduce
        // the combatant's currentHp
        action.payload.combatant.currentHp -= action.payload.hpChange
        // return the combatant with changed HP
        return action.payload.combatant
      }
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
    case Types.D20_ROLLED:
    toBeRolled = `(1d20 + ${action.payload})`
    const dtwenty = d20()
    roll = `[${dtwenty}] + ${action.payload}`
    result = action.payload + dtwenty
    newRoll = {rolled: toBeRolled, roll, result}
    return {
      ...state,
      rolls: state.rolls.concat(newRoll)
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
    // the action.payload should be a dice expression i.e. (2d6 + 2)

    // this case creates a new object in the rolls array in store.
    // for example, when passed 2d6 + 2, an object will be created
    // that looks like
    // object = {
    // rolled: "(2d6 + 2)",
    // roll: "[6][2] + 2",
    // result: 10
    // }
    // the object is then concatinated with the rolls array in store
    toBeRolled = action.payload
    // the number of dice rolled i.e (2d6) will return 2
    const numberOfDice = getNumberOfDice(toBeRolled)
    // the type of dice rolled. i.e. (2d6) will return 6
    const sidesOfDice = getSidesOfDice(toBeRolled)
    let modifier = getModifier(toBeRolled)
    // returns roll in format "1,3"
    const rollArray = rollSidedDice(numberOfDice, sidesOfDice)
    // roll converted from "1,3" to "[1,3] + 3"
    const rollArrayString = `[${rollArray}] + ${modifier}`
    // result the sum of rollArray plus modifier
    const rollArrayReduced = parseInt(rollArray.reduce((a, b) => a + b, 0)) + parseInt(modifier)
    // the object to be added to the redux store in rolls:
    const newSidedRoll = {rolled: action.payload, roll: rollArrayString, result: rollArrayReduced}
    // console.log('newRoll', newSidedRoll);
    return {
      ...state,
      rolls: state.rolls.concat(newSidedRoll)
    }
    case Types.CLEAR_ROLLS:
    return {
      ...state,
      rolls: []
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
