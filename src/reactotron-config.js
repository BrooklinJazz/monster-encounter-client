if (process.env.NODE_ENV !== "production") {
  const Reactotron = require("reactotron-react-js").default;
  const { reactotronRedux } = require("reactotron-redux");
  // const sagaPlugin = require('reactotron-redux-saga')

  Reactotron.configure({ name: "DND!", secure: false })
    .use(reactotronRedux())
    // .use(sagaPlugin())
    .connect();

  // Reactotron.clear()

  console.tron = Reactotron;
}
