import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layout/MenubarUser";
import { getOrders } from "../../functions/users";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data)
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

        <div className="col text-center">
          <div className="row">
            <h1>Purchased History</h1>
            {/* {1 Loop Order Card} */}
            {orders.map((item, index) => {
              console.log('item', item)


              return (
                <div key={index} className="card m-3">
                  <p>Order {'   ' + item.orderstatus}</p>
                  {/* {Table} */}
                    <table className="table table-bordered">
                        <thead>
                          <tr>
                            <td>Title</td>
                            <td>Price</td>
                            <td>Amount</td>
                          </tr>
                        </thead>
                        {/* {2 Loop Table} p product i index */}
                        {item.products.map((p,i) =>
                          <tr>
                            <td>{p.product.title}</td>
                            <td>{p.price}</td>
                            <td>{p.count}</td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan={3}>ราคาสุทธิ : <b><u>{item.cartTotal}</u></b></td>
                        </tr>
                    </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
