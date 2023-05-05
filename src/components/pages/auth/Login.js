// rafce (extension)
import React, { useState } from "react";

//functions
import { login } from "../../functions/auth";

// redux
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redirect กลับไปหน้า Checkout
  const location = useLocation();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    // location.state = cart ที่ส่งมา
    let intended = location.state;
    if (intended) {
      navigate("../" + intended);
    } else {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

    login(value)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.payload.user.username, "Log in Success !!");

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
            _id : res.data.payload.user._id
          },
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.payload.user);

        console.log(typeof(res.data.payload.user))

        roleBaseRedirect(res.data.payload.user.role);
      })

      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

 

  
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Login page</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
