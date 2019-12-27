const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:5000/',
});
class Apis {
  getUser(id) {
    return api.get(`users/${id}`);
  }
  addUser(user) {
    return api.post('users', user);
  }
  removeUser(id) {
    return api.delete(`users/${id}`);
  }
  editUser(user) {
    return api.put(`users/${user.id}`, user);
  } 
}
export {Apis};
