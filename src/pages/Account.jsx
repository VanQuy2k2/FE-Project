import { useEffect, useState } from 'react'
import { handleAccount } from '../services/account/handleAccount';
export default function Account() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
    })
    const [idUser, setIdUser] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return
        const reader = new FileReader()
        reader.onload = (e) => {
            setUser((prev) => ({
            ...prev,
            avatar: e.target.result
        }))
        }
        reader.readAsDataURL(file)       

    }

    useEffect(() => {
        const infoUser = JSON.parse(localStorage.getItem("user")) 
        if (infoUser) {
            setIdUser(infoUser.id);
           setUser({
            name: infoUser.name,
            email: infoUser.email,
            password: "",
            phone: infoUser.phone,
            address: infoUser.address,
            avatar: infoUser.avatar || "",
           })
        }
    }, [])

    const handleUpdateUser = (e) => {
        const {name, value} = e.target
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))  
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await handleAccount.updateAccount(idUser, user)
        if (res.response === "success") {
            alert("Update Success")
            localStorage.setItem("token", JSON.stringify(res.token))
            localStorage.setItem("user", JSON.stringify(res.Auth))
        }
        
    }
  return (
    <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
        <div className="signup-form">
        <h2>New User Signup!</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder="Name" value={user.name} onChange={handleUpdateUser}/>
            <input type="email" name='email' placeholder="Email Address" readOnly value={user.email} onChange={handleUpdateUser}/>
            <input type="password" name='password' placeholder="Password" value={user.password} onChange={handleUpdateUser}/>
            <input type="number" name='phone' placeholder="Phone" value={user.phone} onChange={handleUpdateUser}/>
            <input type="text" name='address' placeholder="Address" value={user.address} onChange={handleUpdateUser}/>
            <input type="file" name='avatar' placeholder="Avatar" onChange={handleFileChange}/>
            <button type="submit" className="btn btn-default">Signup</button>
        </form>
        </div>
    </div>
  )
}
