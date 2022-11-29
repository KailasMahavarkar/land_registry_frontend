import thunk from "redux-thunk";
import logger from "redux-logger";
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { stateReducer } from "./reducers/stateReducer";

const persistConfig = {
	key: "root",
	storage,
	debug: true,
};

const persistedReducer = persistReducer(persistConfig, stateReducer);

export default () => {
	let store = createStore(persistedReducer);
	let persistor = persistStore(store);
	return { store, persistor };
};
