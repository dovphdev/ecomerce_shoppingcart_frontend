import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { useSelector } from "react-redux";

//function
import { getOrders } from "../../functions/users";

//notify
import { toast } from "react-toastify";

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(orders);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {orders.map((item, index) => {
            console.log("item", item);

            return (
              <div key={index} className="card m-3">
                <p>Order {"   " + item.orderstatus}</p>
                {/* {Table} */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Price</td>
                      <td>Count</td>
                    </tr>
                  </thead>
                  {/* {2 Loop Table} p product i index */}
                  {item.products.map((p, i) => (
                    <tr>
                      <td>{p.product.title}</td>
                      <td>{p.price}</td>
                      <td>{p.count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3}>
                      ราคาสุทธิ :{" "}
                      <b>
                        <u>{item.cartTotal}</u>
                      </b>
                    </td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
