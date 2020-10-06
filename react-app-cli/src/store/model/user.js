import { UPDATA_TOKEN, UPDATA_UID, UPDATA_USERINFO } from '../types/index'
import { _login, _getIdByToken, _getUserById } from '../../api/user';
import { setCookie, getCookie } from '@/utils'
import { routerRedux } from 'dva/router'


export default {
    namespace: 'user',
    state: {
        token: getCookie('token') || "",
        uid: '',
        userInfo: {}
    },
    reducers: {
        [UPDATA_TOKEN](state, { payload }) {
            return {
                ...state,
                token: payload,

            }
        },
        [UPDATA_UID](state, { payload }) {
            return {
                ...state,
                uid: payload,
            }
        },
        [UPDATA_USERINFO](state, { payload }) {
            return {
                ...state,
                userInfo: payload,
            }
        },

    },
    effects: {
        * login({ payload }, { put, call }) {
            const result = yield call(_login, payload)
            if (result.data.code) {
                setCookie('token', result.data.token)
                yield put({ type: UPDATA_TOKEN, payload: result.data.token })
                yield put(routerRedux.push('/app'))
            }
        },
        * getIdByToken({ payload }, { put, call }) {
            const result = yield call(_getIdByToken, payload)
            setCookie('uid', result.data.uid)
            yield put({ type: UPDATA_UID, payload: result.data.uid })
        },
        * getUserById({ payload }, { put, call }) {
            const result = yield call(_getUserById, payload)
            yield put({ type: UPDATA_USERINFO, payload: result.data.data })
        }

    }
}