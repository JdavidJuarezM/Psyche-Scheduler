// javascript
import axios from 'axios'

// If you use the proxy above, you can keep baseURL as '' and call '/api/...'
export default axios.create({
  baseURL: '', // or 'http://localhost:8080' if you don't use the proxy
  withCredentials: true,
})
