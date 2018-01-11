import { combineReducers } from "redux";
import MonsterReducer from "./monsters_reducer";

const rootReducer = combineReducers({
  monsters: MonsterReducer,
});

export default rootReducer;
