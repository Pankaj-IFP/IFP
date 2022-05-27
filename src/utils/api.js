import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    "Content-type": "application/json"
  }
});


 const user= localStorage.getItem('authUser');
 var userId = null;
 try{
    userId = JSON.parse(user).id;
 }catch(e) {
  // forget about it :)
}
 

export default {
  auth(url = 'auth') {
    return {
        login: ({email, password}) => http.post(url + '/login', {email, password}),
        register: ({email, name, password}) => http.post(url + '/register', {email, name, password}),
        change_password: ({old_password, new_password,pass1}) => http.post(url + `/change_password/${userId}`, {old_password, new_password, pass1}),
    }
   
  },

  map(url = 'map') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit, name, category) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&category=" + category, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  },

  user(url = 'user') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit = 10, name = null, email = null) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&email=" + email, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  }

}