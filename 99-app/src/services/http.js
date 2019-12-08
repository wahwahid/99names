import Axios from 'axios'

const HTTP = Axios.create({
    baseURL: 'http://localhost:9999/'
})

export { HTTP }
