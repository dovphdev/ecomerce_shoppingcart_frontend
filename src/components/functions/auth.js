//รวม ฟังก์ชันเกี่ยวกับ authenticate
// REACT_APP_API = 'http://127.0.0.1:5000/api'
import axios from "axios";

export const register = async (value) => {
  return await axios.post(process.env.REACT_APP_API + "/register", value);
};

export const login = async (value) => {
  return await axios.post(process.env.REACT_APP_API + "/login", value);
};


export const currentUser = async (authtoken) => {
  console.log(authtoken)
  return await axios.post(process.env.REACT_APP_API + "/current-user", 
  {}, 
  {
    headers: {
      authtoken,
    }
  });
};

export const currentAdmin = async (authtoken) => {
  console.log(authtoken)
  return await axios.post(process.env.REACT_APP_API + "/current-admin", 
  {}, 
  {
    headers: {
      authtoken,
    }
  });
};
