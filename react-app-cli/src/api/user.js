import request from "../utils/request";

export function _login({ username, password }) {
    const url = "/user/login";
    return request.post(url, {
        username,
        password
    })
}
export function _getIdByToken(token) {
    const url = '/user/getUserByToken';
    return request.get(url, {
        params: { token }
    })
}
export function _getUserById(uid) {
    const url = '/user/getUserInfo'
    return request.get(url, {
        params: { uid }
    })
}

export function _avatarUpload({ avatarform, uid }) {
    const url = `/user/upload?uid=${uid}`
    return request.post(url, avatarform)
}