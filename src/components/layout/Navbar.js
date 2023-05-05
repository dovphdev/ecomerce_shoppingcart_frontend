import React from "react";
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";

import "./Navbar.css";
// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  // console.log("CART ::::", cart);

  // const cartItemCount = cart.length;

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    navigate("/");
  };

  return (
    <Menu
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
      mode="horizontal"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>

      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, -1]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>

      {user && (
        <>
          {
            user.role === "admin" ? (  // if admin
              <Menu.Item style={{ alignItems: "end", textDecoration:"none" }}>
                <Link to={"/admin/index"}>Admin Dashboard</Link>
              </Menu.Item> 
            ) : (  // if not admin
              <Menu.Item key= "username"
              icon = {<UserOutlined />}
              style={{ alignItems: "end" ,textDecoration:"none"}}>
                <Link to={"/user/index"}>{user.username}</Link>
              </Menu.Item> 
            )
            
          }

          <Menu.Item
            style={{ alignItems: "end" }}
            key="logout"
            onClick={logout}
            icon={<LogoutOutlined />}
          >
            Sign out
          </Menu.Item>
        </>
      )}

      {!user && (
        <>
          <Menu.Item
            key="login"
            icon={<LoginOutlined />}
            style={{ alignItems: "end" }}
          >
            <Link to="/login">Sign in</Link>
          </Menu.Item>

          <Menu.Item
            key="register"
            icon={<UserAddOutlined />}
            style={{ float: "right" }}
          >
            <Link to="/register">Sign up</Link>
          </Menu.Item>
        </>
      )}

      <span className="p-1" style={{ float: "right" }}>
        <Search />
      </span>
    </Menu>
  );
};

export default Navbar;
