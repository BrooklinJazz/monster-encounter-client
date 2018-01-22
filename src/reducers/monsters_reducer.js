// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
import monstersData from "../data/monsters";
import Types from "../types";
import CombatantList from "../containers/CombatantList";
import helpers from "../../helpers"
const monsters = monstersData()

// most of the time people actually use an immutable data structure for reducers
// something like: https://github.com/rtfeldman/seamless-immutable
// or: https://github.com/facebook/immutable-js
const INITIAL_STATE = {
  monsters,
  selectedMonster: null,
  CombatantList: [],
  searchTerm: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.MONSTER_SELECTED:
      return { ...state, selectedMonster: action.monster };
    case Types.ADD_MONSTER_TO_COMBATANTS:
      const newMonster = helpers.deepClone(action.monster);
      newMonster.currentHp = newMonster.HP.Value
      const newCombatantList = state.CombatantList.concat(
        newMonster,
        // action.monster,
      );
      return {
        ...state,
        CombatantList: newCombatantList,
      };
      case Types.REMOVE_COMBATANT:
      // const combatantsListAfterRemove = state.CombatantList.splice(action.payload.index, 1)
      const combatantsListAfterRemove = state.CombatantList.map( (combatant, i) => {
        return combatant
      })
      combatantsListAfterRemove.splice(action.payload.index, 1)
        return {
          ...state,
          CombatantList: combatantsListAfterRemove
        };
      case Types.FILTER_MONSTER_LIBRARY:
        return {
          ...state,
          searchTerm: action.searchTerm
        };
      case Types.CHANGE_MONSTER_HP:
        const combatantsListAfterChange = state.CombatantList.map( (combatant, i) => {
          if (i !== action.payload.index || isNaN(action.payload.hpChange) ) {
            // if the input given by hpChange is not a number
            // or the index of the current monster doesn't match
            // the expected index of payload: return the combatant as it is
            return combatant

            // if healing applied to monster brings it above max health
          } else if (action.payload.monster.currentHp - action.payload.hpChange > action.payload.monster.HP.Value) {
            // set currentHp to maxHp `action.payload.monster.HP.Value`
            action.payload.monster.currentHp = action.payload.monster.HP.Value
            // return the monster with max hp
            return action.payload.monster

          } else if (action.payload.monster.currentHp - action.payload.hpChange < 0) {
            action.payload.monster.currentHp = 0
            return action.payload.monster
          } else {
            // we are applying damage to the monster so positive numbers reduce
            // the monster's currentHp
            action.payload.monster.currentHp -= action.payload.hpChange
            // return the monster with changed HP
            return action.payload.monster
          }
        })
        // console.log('reducer working', newCombatantsList);
        return {
          ...state,
          CombatantList: combatantsListAfterChange
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
