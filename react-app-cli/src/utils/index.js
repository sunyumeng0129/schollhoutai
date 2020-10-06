export function setCookie(key, val) {
    localStorage.setItem(key, val)
}
export function getCookie(key) {
    return localStorage.getItem(key)
}