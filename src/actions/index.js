import Types from "../types";

const createAction = (type, params = null) => ({ type, ...params });

// Actions relating to MonsterList
export const addMonsterToCombatants = monster =>
createAction(Types.ADD_MONSTER_TO_COMBATANTS, { monster });

export const filterLibrary = searchTerm => {
  console.log('in actions',searchTerm)
  return createAction(Types.FILTER_MONSTER_LIBRARY, { searchTerm });
}

// Actions relating to CombatantList
export const selectCombatant = combatant =>
createAction(Types.MONSTER_SELECTED, { combatant });

export const changeCombatantHp = payload =>
createAction(Types.CHANGE_MONSTER_HP, { payload });

export const removeCombatant = payload =>
createAction(Types.REMOVE_COMBATANT, { payload })

// Actions relating to Rolls
export const d20Roll = payload =>
createAction(Types.D20_ROLLED, { payload });
