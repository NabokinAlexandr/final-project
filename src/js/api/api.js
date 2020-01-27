const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:5000/'
});
class Apis {
  getUsers() {
    return api.get('users');
  }
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
  setCurrentUser(user) {
    return api.post('currentUser', user);
  }
  getCurrentUser() {
    return api.get('currentUser');
  }
  editCurrentUser(user) {
    return api.put(`currentUser/${user.id}`, user);
  }
  removeCurrentUser(id) {
    return api.delete(`currentUser/${id}`);
  }
}
export {Apis};
