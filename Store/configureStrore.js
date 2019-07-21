// Store/configureStore.js

import { createStore , combineReducers} from 'redux'
import paramChange from '../reducers/paramReducer'
import persistChange from '../reducers/persistReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(CombineReducers( {paramChange,persistChange}))