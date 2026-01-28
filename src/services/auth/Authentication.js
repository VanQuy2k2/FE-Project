import axios from "axios"

export const Authentication = {
    register: async (data) => {
        const res = await axios.post("http://localhost/laravel8/laravel8/public/api/register", data)
        return res;
    },
    login: async (data) => {
        const res = await axios.post("http://localhost/laravel8/laravel8/public/api/login", data)
        if (res.data.response === "error") {
            console.log("tai khoan hoac mat khau khong hop le");    
        }
        return res
       
    }
}