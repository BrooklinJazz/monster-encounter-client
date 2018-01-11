// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
const INITIAL_STATE = {
  selectedMonster: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "MONSTER_SELECTED":
      const monsterData = action.payload;
      return { ...state, selectedMonster: monsterData };
  }
  return state;
}
