import request from "../utils/request";
export function _getShopLists() {
    const url = '/product/list'
    return request.get(url)
}
export function _addLists(shop) {
    const url = '/product/add'
    return request.post(url, shop)
}
export function _editLists(shop) {
    const url = '/product/edit'
    return request.put(url, shop)
}
export function _delLists(pid) {
    const url = '/product/del'
    return request.delete(url, {
        params: { pid }
    })
}
export function _searchLists(keyword) {
    const url = '/product/searchByType'
    return request.get(url, {
        params: { keyword }
    })
}
export function _ShopDetail(pid) {
    const url = '/product/:pid'
    return request.get(url, {
        params: { pid }
    })
}