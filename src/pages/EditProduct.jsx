import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handProduct } from '../services/product/handleProduct';
import axios from 'axios';
const user = JSON.parse(localStorage.getItem("user"))
const token = JSON.parse(localStorage.getItem("token"))
export default function EditProduct() {
    const [avatarCheckBox, setAvatarCheckBox] = useState([]);
    const [newImage, setNewImage] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        price: "",
        id_category: "",
        company_profile: "",
        id_brand: "",
        status: "",
        sale: "",
        image: "",
        detail: "",
    })
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    useEffect(() => {
        if(!id) return;
        const loadDetailProduct = async () => {
            const res = await handProduct.detailProduct(id)
            if (res.response === "success") {
                setProduct(res.data)
            } 
        }
      loadDetailProduct()
    }, [id])

    useEffect(() => {
        const loadingBrandCategory = async () => {
        const res = await handProduct.brandCategory()
        if (res.message === "success") {
          setCategory(res.category)
          setBrand(res.brand)
        } 
      }
      loadingBrandCategory()
    }, [])

    const handleOnChange = (e) => {
        const {name, value,checked,type} = e.target
          if (type === "checkbox") {
            setAvatarCheckBox(prev =>
                checked
                ? [...prev, value]
                : prev.filter(item => item !== value)
            );
            return;
  }
        
        setProduct((prev) => {
            if (name === "status") {
                const status = Number(value)
                return {
                    ...prev,
                    status,
                    sale: status === 1 ? 0 : prev.sale
                }
            }
            return {
                ...prev,
                [name]: value,
            }
        }
    )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const finalImage = images.length - avatarCheckBox.length + newImage.length;
        if (finalImage > 3) {
            alert("Tổng số hình ảnh tối đa là 3");
            return;
        } 
        let formData = new FormData();
        formData.append("name", product.name)
        formData.append("price", product.price)
        formData.append("company", product.company_profile)
        formData.append("category", product.id_category)
        formData.append("brand", product.id_brand)
        formData.append("status", product.status)
        formData.append("sale", product.sale)
        Object.keys(newImage).map(item => {
            formData.append("file[]", newImage[item])
        }) 
        formData.append("detail", product.detail)
        avatarCheckBox.map((item) => {
            formData.append("avatarCheckBox[]", item)
        }) 
        const res = await axios.post(`http://localhost/laravel8/laravel8/public/api/user/product/update/${id}`,formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.response === "success") {
            alert("Edit Product Success")
            navigate("/account/product/list")
        }
        if (res.data.errors) {
            alert("Edit Error")
        }
    }
    const images = product.image ? JSON.parse(product.image) : []
  
  return (
    <div className="blog-post-area">
        <h2 className="title text-center">Update product</h2>
        <div className="signup-form">
        <h2>New Update Product!</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' placeholder="Name" value={product.name} onChange={handleOnChange}/>
            <input type="number" name='price' placeholder="Price" value={product.price} onChange={handleOnChange}/>
            <input type="text" name='company' placeholder="Company" value={product.company_profile} onChange={handleOnChange}/>
            <select value={product.id_category} name='category' onChange={handleOnChange}>
                {category && category.map((item) => (
                    <option key={item.id} value={item.id} name="category">{item.category}</option>
                ))}
            </select>
            <select value={product.id_brand} name='brand' onChange={handleOnChange}>
                {brand && brand.map((item) => (
                    <option key={item.id} value={item.id} name="brand">{item.brand}</option>
                ))}
            </select>
            <select name='status' value={product.status} onChange={handleOnChange}>
                <option value={1}>New</option>
                <option value={0}>Sale</option>
            </select>
            {product.status === 0 && (
                <input type="number" name='sale' value={product.sale} placeholder="%" onChange={handleOnChange}/>
            )}
            <input type="file" name='newImage' placeholder="Avatar" multiple onChange={(e) => setNewImage(e.target.files)}/>
            <ul>
                {images.length > 0 && images.map((img,index) => (
                    <li key={index}>
                        <img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/${img}`} style={{ width: "130px", height: "70px" }} alt=""/>
                        <input type="checkbox" checked={avatarCheckBox.includes(img)} value={img} onChange={handleOnChange}/>
                    </li>
                ))}
            </ul>
            <input type="text" value={product.detail} name='detail' placeholder="Detail" onChange={handleOnChange}/>
            <button type="submit" className="btn btn-default">Update</button>
        </form>
        </div>
    </div>
  )
}
