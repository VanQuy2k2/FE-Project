import axios from "axios"
const token = JSON.parse(localStorage.getItem("token"))
export const handProduct = {
    brandCategory: async () => {
        const res = await axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
        return res.data
    },
    addProduct: async (data) => {
        const res = await axios.post("http://localhost/laravel8/laravel8/public/api/user/product/add", data , {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
        })
        return res.data
    },
    myProduct: async () => {
        const res = await axios.get("http://localhost/laravel8/laravel8/public/api/user/my-product", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        })
        return res.data
    },
    deleteProduct: async (id) => {
        const res = await axios.get(`http://localhost/laravel8/laravel8/public/api/user/product/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        })
        return res.data
    },
    detailProduct: async (id) => {
        const res = await axios.get(`http://localhost/laravel8/laravel8/public/api/product/detail/${id}`)
        return res.data
    },
    getProduct: async () => {
        const res = await axios.get("http://localhost/laravel8/laravel8/public/api/product")
        return res.data
    },

}