import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Drawer } from "antd";

const SideDrawer = () => {
  // ส่งข้อมูลไปหลังบ้าน
  const dispatch = useDispatch();

  // เอา cart ออกมาจาก redux store
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };

  return (
    <Drawer
      title={"Cart " + cart.length + " product"}
      placement="right"
      open={drawer}
      onClose={onCloseDrawer}
    >
      {cart.map((item) => (
        <div style={{ width: "100%"}}
        className="row">
          <div className="col ">
            <img
              alt="img-drawer"
              src={item.images[0].url}
              style={{ width: "100%"}}
            />
            <p className="text-center bg-secondary text-light">
              {item.title} x {item.count}
            </p>
          </div>
        </div>
      ))}

      <Link to= '/cart'>
      <div className="d-flex justify-content-center">
        <button onClick={onCloseDrawer}
        className="btn btn-primary">Proceed to Checkout</button>
      </div>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
