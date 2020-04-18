import axios from 'axios';


// const API_BASE_URL = 'https://wooyongpark.com';
const API_BASE_URL = 'http://localhost:3002'

const client = axios.create({
  baseURL: API_BASE_URL,
})

export function fetchWaveData() {
  return client.get('/api/waveDB/sample')
   .then(response => {
    // setWaveDataState(convertCsv(response.data))
    console.log(response.data,'RESPONSE DATA')
    return response.data
   })
   .catch(err => console.log(err))
}


export function postWaveData(stationCode = 51212) {
  return client.post('/api/waveDB/official', { areacode: stationCode })
    .then(response => {
      return response.data
     // setWaveDataState(convertCsv(response.data))
    })
    .catch(err => console.log(err))
}

export function login({username, password}) {
  return client.post('/api/auth/login', { username, password }).then((result)=> {
    localStorage.setItem('jwtToken', result.data.token)
    return result.data
  })
}

export function register({username, password}) {
  return client.post('/api/auth/register', { username, password })
}


export function getUserAuthorized() {
    client.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    // console.log(client)    // updates the authorization with jwt token
    return client.get('/api/auth').then(result => {
      console.log(result)
      return result.data
    })
}

export function getWaveDataAuthorized(stationCode = 51212) {
    client.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return client.get('/api/waveDB/official/preview')
      .then(response => {
        return response.data
       // setWaveDataState(convertCsv(response.data))
      })
      .catch(err => console.log(err))
}
