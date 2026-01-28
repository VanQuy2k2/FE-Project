import axios from "axios"
const token = JSON.parse(localStorage.getItem("token"))  
export const handleAccount = {
    updateAccount: async (id,data) => {
        const res = await axios.post(`http://localhost/laravel8/laravel8/public/api/user/update/${id}`,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    }
}