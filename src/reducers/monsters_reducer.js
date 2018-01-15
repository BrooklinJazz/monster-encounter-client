// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
import monstersData from "../data/monsters";
import Types from "../types";
import monsterCombatants from "../containers/monster-combatants";

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
      const newMonsterCombatants = state.monsterCombatants.concat(
        action.monster,
      );
      return {
        ...state,
        monsterCombatants: newMonsterCombatants,
      };
      case Types.FILTER_MONSTER_LIBRARY:
        return {
          ...state,
          searchTerm: action.searchTerm
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
