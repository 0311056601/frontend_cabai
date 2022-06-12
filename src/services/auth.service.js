import axios from "axios";

require("dotenv").config();

const API_URL = process.env.REACT_APP_BACKEND_URL + "api/v2/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, passwordK) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      passwordK,
    });
  }
}

export default new AuthService();