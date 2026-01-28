import axios from "axios"

export const handleBlog = {
    getBlogs: async () => {
        const res = await axios.get("http://localhost/laravel8/laravel8/public/api/blog")
        return res.data.blog.data;
    },
    getDetailBlog: async (id) => {
        const res = await axios.get(`http://localhost/laravel8/laravel8/public/api/blog/detail/${id}`)
        return res.data.data;
    },

} 

