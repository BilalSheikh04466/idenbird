import axios from "../utils/axios";

export const getProduct = () => axios.get("/product");

export const createProduct = (data) =>
  axios.post("/product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// axios.post(`/product`, payload);

// export const updateProduct = ({ productData, _id }) =>
//   axios.put(`/product/${_id}`, productData);

// export const deleteProduct = (payload) =>
//   axios.delete(`/product`, { data: payload });
