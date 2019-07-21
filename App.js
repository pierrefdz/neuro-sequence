import React, {Component} from 'react'
import Navigation from './navigation/Navigation'

// Pour redux et redux persist
import { createAppContainer } from 'react-navigation'
import { createStore , combineReducers} from 'redux'
import paramChange from './reducers/paramReducer'
import persistChange from './reducers/persistReducer'
import { Provider } from 'react-redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

// //Pour le serveur
// import FTP from 'react-native-ftp';
//
// FTP.setup("198.245.61.139",22) //Setup host
// FTP.login("neuropoly","MyneuroPoly74521").then(
//   (result)=>{
//     FTP.list("./www/test.json")
//     .then(
//       (result)=>{
//         console.log(result);
//       }
//     );
//   },
//   (error)=>{
//     alert(error);
//   }
// )
//
// FTP.uploadFile("./www/test.json","./www")
//     .then(result=>console.log(result))
//     .catch(error=>alert(error))

// FTP.downloadFile("./www/index.html","./navigation/")
//     .then(result=>console.log(result))
//     .catch(error=>alert(error))

const rootPersistConfig = {
  key: 'root',
  blacklist:['paramChange'],
  storage: storage
}

const store =createStore(persistCombineReducers(rootPersistConfig, {paramChange,persistChange}))
const AppContainer = createAppContainer(Navigation)

export default class App extends React.Component {

  render() {
      let persistor=persistStore(store)
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
