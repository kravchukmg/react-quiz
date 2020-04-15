import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-16fd2.firebaseio.com/'
})