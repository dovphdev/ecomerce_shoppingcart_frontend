import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getWishList, removeWishList } from "../../functions/users";
import { Link } from "react-router-dom";


import MenubarUser from "../../layout/MenubarUser";

const WishList = () => {
  const [wishlist, setWishList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token)
      .then((res) => {
        setWishList(res.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (productId) => {
    removeWishList(user.token, productId)
      .then((res) => {
        console.log(res.data);
        loadData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className="row">
            <h1>Wishlist Page</h1>
            {wishlist.map((item, index) => (
              <div key={index} className="alert alert-secondary">
                <Link to = {"/product/" + item._id}>
                 {item.title}
                </Link>
                

                <span
                  onClick={() => handleRemove(item._id)}
                  style={{ float: "right" , cursor : "pointer"}}
                >
                  ลบ
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
