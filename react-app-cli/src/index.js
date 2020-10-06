import dva from 'dva'
import {createBrowserHistory} from 'history'
import router from './router'
import './css/index.css'
import { createStore } from "./store"
const app = dva({
    history: createBrowserHistory(),
    initialState:{}
});
createStore(app);
app.router(router)
app.start('#root')