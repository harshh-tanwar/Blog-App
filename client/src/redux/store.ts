import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import rootSaga from "./sagas";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
let persistor = persistStore(store)

export {store, persistor};
