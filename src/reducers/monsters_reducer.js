// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
import monstersData from "../data/monsters";
import Types from "../types";
import monsterCombatants from "../containers/monster-combatants";
import helpers from "../../helpers"
const monsters = monstersData()

// most of the time people actually use an immutable data structure for reducers
// something like: https://github.com/rtfeldman/seamless-immutable
// or: https://github.com/facebook/immutable-js
const INITIAL_STATE = {
  monsters,
  selectedMonster: null,
  monsterCombatants: [],
  searchTerm: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.MONSTER_SELECTED:
      return { ...state, selectedMonster: action.monster };
    case Types.ADD_MONSTER_TO_COMBATANTS:
      const newMonster = helpers.deepClone(action.monster);
      newMonster.currentHp = newMonster.HP.Value
      const newMonsterCombatants = state.monsterCombatants.concat(
        newMonster,
        // action.monster,
      );
      return {
        ...state,
        monsterCombatants: newMonsterCombatants,
      };
      case Types.FILTER_MONSTER_LIBRARY:
        return {
          ...state,
          searchTerm: action.searchTerm
        };
      case Types.CHANGE_MONSTER_HP:
        const newCombatantsList = state.monsterCombatants.map( (combatant, i) => {
          // console.log('combatant', combatant);
          // console.log('action', action.monster);
          // console.log('action index', action.index);
          // console.log('reducer index', i);
          if (i !== action.payload.index) {
            // console.log(1);
            return combatant
          } else {
            // console.log(2);
            // we are applying damage to the monster so positive numbers reduce
            // the monster's currentHp
            action.payload.monster.currentHp -= action.payload.hpChange
            // action.monster.currentHp -= action.hpChange
            return action.payload.monster
          }
        })
        console.log('reducer working', newCombatantsList);
        return {
          ...state,
          monsterCombatants: newCombatantsList
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
