// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
export default function(state = null, action) {
  switch (action.type) {
    case 'MONSTER_SELECTED':
      return action.payload;
  }
  return state
}
