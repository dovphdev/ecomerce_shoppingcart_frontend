import axios from "axios";

export const createRating = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/rating", value, {
    headers: {
      authtoken,
    },
  });
};

export const getRating = async (authtoken) =>
await axios.get(process.env.REACT_APP_API + "/rating" , {
  headers: {
    authtoken,
  },
});
