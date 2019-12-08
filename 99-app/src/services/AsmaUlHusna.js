import { HTTP } from './http'

const AsmaUlHusna = {
    list () {
        return HTTP.get('/list')
    },

    detail (id) {
        return HTTP.get(`/detail/${id}`)
    }
}

export { AsmaUlHusna }
