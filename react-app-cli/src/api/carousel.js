import request from "../utils/request";
export function _getCarouselLists(uid) {
    const url = '/carousel/list'
    return request.get(url, {
        params: {
            type: 'all'
        }
    })
}

export function _editCarouselById(carousel) {
    const url = '/carousel/edit'
    return request.put(url, carousel)
}
export function _addCarousel(carousel) {
    const url = '/carousel/add'
    return request.post(url, carousel)
}
export function _delCarousel(cid) {
    const url = '/carousel/del'
    return request.delete(url, {
        params: { cid }
    })
}