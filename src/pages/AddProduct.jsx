import  { useEffect, useState } from 'react'
import { handProduct } from '../services/product/handleProduct'
import ErrorsComponent from '../components/ErrorsComponent'

export default function AddProduct() {
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [dataForm, setDataForm] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: 1,
    sale: 0,
    company: "",
    image: [],
    detail: ""
  })
  const [error, setError] = useState({})
  
  const handleOnChange = (e) => {
      const {name, value, type, files} = e.target
      setDataForm(prev => {
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
          [name]: type === "file" ? files : value
        }
      })
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      let SubmitError = {}
      let flag = true
      if (dataForm.name === "") {
        SubmitError.name = "Vui long nhap name"
        flag = false
      }
      if (dataForm.price === "") {
        SubmitError.price = "Vui long nhap gia"
        flag = false
      }
      if (dataForm.category === "") {
        SubmitError.category = "Vui long chon category"
        flag = false
      }
      if (dataForm.brand === "") {
        SubmitError.brand = "Vui long chon brand"
        flag = false
      }
      if (dataForm.status === 0 && dataForm.sale <= 0 ) {
        SubmitError.sale = "Gia sale khong hop le"
        flag = false
      }
      if (dataForm.company === "") {
        SubmitError.company = "Vui long nhap company"
        flag = false
      }
      if (dataForm.detail === "") {
        SubmitError.detail = "Vui long nhap detail"
        flag = false
      }
      if (dataForm.image.length === 0) {
        SubmitError.image = "Ban chua them hinh anh"
        flag = false
      }else {
        const type = ["png", "jpg", "jpeg", "PNG", "JPG"]
        let imageType;
        for (let i = 0; i < dataForm.image.length; i++) {
          imageType = dataForm.image[i].type.split("/").pop()
          const checkType = type.includes(imageType)
            if (!checkType) {
              SubmitError.file = "Hinh anh chua dung dinh dang"
              flag = false
              break
            }else {
               for (let i = 0; i < dataForm.image.length; i++) {
                 if (dataForm.image[i].size > 1024 * 1024) {
                 SubmitError.file = "Size hinh anh khong phu hop"
                flag = false
                break  
            }
          }
        }
        }
      }

      if(!flag) {
          setError(SubmitError)
          return
      }
      

      let formData = new FormData();
      formData.append("name", dataForm.name)
      formData.append("price", dataForm.price)
      formData.append("category", dataForm.category)
      formData.append("brand", dataForm.brand)
      formData.append("status", dataForm.status)
      formData.append("sale", dataForm.sale)
      formData.append("company", dataForm.company)
      formData.append("detail", dataForm.detail)
      Object.keys(dataForm.image).map((item) => {
        formData.append("file[]", dataForm.image[item])
      }) 
      const res = await handProduct.addProduct(formData)
      if (res.response === "success") {
        alert("Add New Product Success")
        setDataForm({
          name: "",
          price: "",
          category: "",
          brand: "",
          status: 1,
          sale: 0,
          company: "",
          image: [],
          detail: ""
        })
      }
      
  }
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

  return (
   <div className="blog-post-area">
        <h2 className="title text-center">Add Product</h2>
        <div className="signup-form">
        <h2>Create New Product!</h2>
        <ErrorsComponent error={error}/>
        <form onSubmit={handleSubmit}>
            <input type="text" value={dataForm.name} name='name' placeholder="Name" onChange={handleOnChange}/>
            <input type="number" value={dataForm.price} name='price' placeholder="Price" onChange={handleOnChange}/>
            <select onChange={handleOnChange} value={dataForm.category} name='category'>
              <option value="">Please choose category</option>
              {category && category.map((item) => (
                <option key={item.id} value={item.id} name="category">{item.category}</option>
              ))}
            </select>
            <select onChange={handleOnChange} value={dataForm.brand} name='brand'>
              <option value="">Please choose brand</option>
              {brand && brand.map((item) => (
                <option key={item.id} value={item.id}>{item.brand}</option>
              ))}
            </select>
            <select onChange={handleOnChange} value={dataForm.status} name='status'>
              <option value={1}>New</option>
              <option value={0}>Sale</option>
            </select>
            {dataForm.status === 0 && (
                <input type="number" name='sale' value={dataForm.sale} placeholder="%" onChange={handleOnChange}/>
            )}
            <input type="text" value={dataForm.company} name='company' onChange={handleOnChange} placeholder="Company Profile"/>
            <input type="file" key={dataForm.image.length} onChange={handleOnChange}  name='image' multiple/>
            <input type="text" value={dataForm.detail} onChange={handleOnChange} name='detail' placeholder="Detail"/>
            <button type="submit" className="btn btn-default">Create</button>
        </form>
        </div>
    </div>
  )
}
