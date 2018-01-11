// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
import monstersData from "../data/monsters";
import Types from "../types";
import monsterCombatants from "../containers/monster-combatants";

// most of the time people actually use an immutable data structure for reducers
// something like: https://github.com/rtfeldman/seamless-immutable
// or: https://github.com/facebook/immutable-js
const INITIAL_STATE = {
  monsters: monstersData(),
  selectedMonster: null,
  monsterCombatants: [],
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
  }
  return state;
}
