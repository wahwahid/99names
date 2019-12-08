import Axios from 'axios'

const HTTP = Axios.create({
    baseURL: 'https://99-api.now.sh/'
})

export { HTTP }
