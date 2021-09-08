import axios from 'axios'



const ask = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 6000,
  transitional: {
    forcedJSONParsing: true,
    silentJSONParsing: false,
    clarifyTimeoutError: false
  }
});

export default ask