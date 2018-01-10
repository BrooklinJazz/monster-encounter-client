import { combineReducers } from 'redux';
import MonsterReducer from './reducer_monsters'

const rootReducer = combineReducers({
  monsters: MonsterReducer
});

export default rootReducer;
