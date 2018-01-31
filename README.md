#dndBattleMaster

## Desired Features to Impliment
1. User Sign In
  - Save fights (the existing CombatantList)
  - using express on the BackEnd
2. Layouts
  - Possibly using Router to have different layouts of the page i.e having a combatant focused layout that shows all of the combatants detailed stats on the page, and the current layout which is better for selecting Combatants one at a time.
3. Stylings
  - general stylings
  - better layout for MonsterDetail.js
  - Roll.js divs
  - MonsterList.js
  - CombatantList.js

# tech
react-router
```js
npm install --save react-router-dom
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
```
react-string-replace
npm install --sace react-string-replace
```js
const reactStringReplace = require('react-string-replace')
```
NOT USING THIS
npm install --save redux-state-save
```js
import Storage from "redux-state-save";

var storage1 = new Storage();
storage1.setConfig({
    storage_type: "local_storage",
    local_key: "redux-states"
});
var store = createStore(reducers, applyMiddleware(storage1.saveState()));

// state data load from local storage
store = storage1.loadState(store);
```
