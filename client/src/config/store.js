import {createStore, combineReducers} from "redux"
import gWinReducer from "../components/GWin/reducer"

const rootReducer = combineReducers({
    gwin: gWinReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;