// state argument is not application state, only the state
// this reducer is responsible for
// NOTE TODO selecting one monster to start, but may have several active
// monsters at once
import monstersData from "../data/monsters";

const INITIAL_STATE = {
  monsters: monstersData(),
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "HELLO":
      return action.payload;
  }
  return state;
}
