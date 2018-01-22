import Types from "../types";

const createAction = (type, params = null) => ({ type, ...params });

// export function selectMonster(monster) {
//   // selectMonster is an ActionCreator, it needs to return an action,
//   // an object with a type property
//   console.log("a monster was selected:", monster.Name);
//   return {
//     type: types.MONSTER_SELECTED,
//     payload: monster,
//   };
// }

export const selectMonster = monster =>
  createAction(Types.MONSTER_SELECTED, { monster });

export const changeMonsterHp = payload =>
  createAction(Types.CHANGE_MONSTER_HP, { payload });

export const removeCombatant = payload =>
  createAction(Types.REMOVE_COMBATANT, { payload })

export const addMonsterToCombatants = monster =>
  createAction(Types.ADD_MONSTER_TO_COMBATANTS, { monster });


export const filterLibrary = searchTerm => {
  console.log('in actions',searchTerm)
  return createAction(Types.FILTER_MONSTER_LIBRARY, { searchTerm });
}
