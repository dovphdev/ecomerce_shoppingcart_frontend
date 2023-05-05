//rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";

//function
import { ReadCategory, EditCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//redux
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const param = useParams();

  //   console.log(param.id)
  const [name, setName] = useState("");
  useEffect(() => {
    //code
    // console.log(name)
    loadData(user.token, param.id);
  }, []);

  const loadData = (authtoken, id) => {
    ReadCategory(authtoken, id)
      .then((res) => {
        // console.log(res)
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EditCategory(user.token, param.id, { name })
      .then((res) => {
        console.log(res);
        navigate("/admin/create-category");
        toast.success("Updated : " + res.data.name + " to " + name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>Update Category Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Update Category</label>
              <input
                className="form-control mt-3"
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary mt-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
