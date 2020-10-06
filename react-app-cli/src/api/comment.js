import request from "../utils/request";
export function _getCommentLists() {
    const url = '/comment/all'
    return request.get(url)
}
export function _delComment(cid) {
    const url = '/comment/del'
    return request.delete(url, { params: { cid } })
}