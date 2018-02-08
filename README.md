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

## Packages:
### redux-persist
```js
import {persistStore, autoRehydrate} from 'redux-persist'

const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, undefined, compose(
      middleware,
      autoRehydrate()
    ))
    : console.tron.createStore(rootReducer, undefined, compose(
      middleware,
      autoRehydrate()
    ))

persistStore(store)
```
### react-router
```js
// import:
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
```
### react-moment

```js
// import:
import Moment from 'react-moment';
```

### react-string-replace

```js
// import:
import Moment from 'react-moment';
```
### reactstrap
```js
// import Where Button is the Component that you want to import
import { Button } from 'reactstrap';

