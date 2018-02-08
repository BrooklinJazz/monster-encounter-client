import Types from "../types";

const createAction = (type, params = null) => ({ type, ...params });

export const fetchMonsters = payload =>
createAction(Types.FETCH_MONSTERS, { payload })

// Actions relating to MonsterList
export const addMonsterToCombatants = monster =>
createAction(Types.ADD_MONSTER_TO_COMBATANTS, { monster });

export const filterLibrary = searchTerm => {
  return createAction(Types.FILTER_MONSTER_LIBRARY, { searchTerm });
}

// Actions relating to CombatantList
export const selectCombatant = combatant =>
createAction(Types.MONSTER_SELECTED, { combatant });

export const clearCombatants = payload =>
createAction(Types.CLEAR_COMBATANTS, { payload });

export const changeCombatantHp = payload =>
createAction(Types.CHANGE_MONSTER_HP, { payload });

export const removeCombatant = payload =>
createAction(Types.REMOVE_COMBATANT, { payload })

export const rollInitiatives = payload =>
createAction(Types.ROLL_INITIATIVES, { payload })

export const renderSavedCombat = payload =>
createAction(Types.RENDER_SAVED_COMBAT, { payload })

// Actions relating to Rolls
export const d20Roll = payload =>
createAction(Types.D20_ROLLED, { payload });

export const sidedDiceRoll = payload =>
createAction(Types.SIDED_DICE_ROLLED, { payload });

export const deleteRoll = payload =>
createAction(Types.DELETE_ROLL, { payload });

export const clearRolls = payload =>
createAction(Types.CLEAR_ROLLS, { payload })


// Actions related to Fights (Save Files)
export const updateFights = payload =>
createAction(Types.UPDATE_FIGHTS, { payload })
