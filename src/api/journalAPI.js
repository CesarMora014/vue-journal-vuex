import axios from 'axios'

const jorunalAPI = axios.create({
    baseURL: 'https://vue-demos-da782-default-rtdb.firebaseio.com'
})

export default jorunalAPI