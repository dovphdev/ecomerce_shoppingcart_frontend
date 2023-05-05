import React, { useState, useEffect } from "react";
// import StarRating from './StarRating';
import { useLocation, useNavigate } from "react-router-dom";
import { createRating } from "../../functions/rating";
import { useSelector } from "react-redux";
import { currentUser } from "../../functions/auth";

import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const RatingProduct = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [value, setValue] = useState({
    star: "",
    ratingBy: "",
    product: "",
  });

  const idtoken = localStorage.token;

  useEffect(() => {
    if (idtoken) {
      currentUser(idtoken)
        .then((res) => {
          //code
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          //err
          console.log(err);
        });
    }
  },[])


  console.log(user);

  const location = useLocation();
  const { product } = location.state;
  const stars = Array(5).fill(0);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (starValue) => {
    setCurrentValue(starValue);
    setValue({
      star: starValue,
      ratingBy: user._id,
      product: product._id,
    });
    console.log(starValue);
  };

  const handleMouseOver = () => {
    setHoverValue();
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setCurrentValue(starValue);
    createRating(idtoken, value);
    navigate(`/product/${product._id}`);
    console.log(value);
  };
  //   console.log(product);
  return (
    <div style={styles.container}>
      <h2>Star Rating</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={35}
                style={{
                  marginRight: "10",
                  cursor: "pointer",
                }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
        <div>
          <button className="btn btn-success mt-3">Submit</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default RatingProduct;

// const initialstate = {
//     star : "5",
//     ratingBy : "",
//     product : ""
// }

// const ReviewProduct = () => {
//     const { user } = useSelector((state) => ({ ...state }));
//     const [values, setValues ] = useState(initialstate)

//   const location = useLocation();
//   const { product } = location.state;

//   const [rating, setRating] = useState(0);

//   console.log( );

//   useEffect(() => {
//     loadData(user.token);
//   }, []);

//   const loadData = (authtoken) => {
//     createRating(authtoken)
//       .then((res) => {
//         console.log(res.data);
//         setValues({ ...values, product: product._id, ratingBy: user._id});
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   console.log("values", values);

//   // Catch Rating value
//   const handleRating = (rate) => {
//     setRating(rate);

//     // other logic
//   };
//   // Optinal callback functions
//   const onPointerEnter = () => console.log("Enter");
//   const onPointerLeave = () => console.log("Leave");
//   const onPointerMove = (value, index) => console.log(value, index);

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     createRating(user.token, values)
//     .then((res) => {
//         console.log(res.data)
//         console.log(e.target.values)

//     }).catch((err) => {
//         console.log(err.response)
//     });
//   }

//   return (
//     <div>
//       <h1 className="justify-content-center d-flex mt-3">
//         Please review this product
//       </h1>
//       <div className="justify-content-center d-flex mt-3">
//         <div>
//           <Rating
//             onClick={handleRating}
//             onPointerEnter={onPointerEnter}
//             onPointerLeave={onPointerLeave}
//             onPointerMove={onPointerMove}
//             /* Available Props */
//           />
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//       <div className="justify-content-center d-flex mt-3" >
//         <button className="btn btn-primary">Submit</button>
//       </div>
//       </form>
//     </div>
//   );
// };

// export default ReviewProduct;
