import { useEffect, useState } from "react"
import { handProduct } from "../services/product/handleProduct"
import { Link, useNavigate } from "react-router-dom"

const user = JSON.parse(localStorage.getItem("user"))
export default function MyProduct() {
	const [products, setProducts] = useState({})
	const navigate = useNavigate()
	useEffect(() => {
		const loadDataProduct = async () => {
			const res = await handProduct.myProduct()
			if (res.response === "success") {
				setProducts(res.data)
			}
		}
		loadDataProduct()
	}, [])

	const handleRemove = async (id) => {
		const res = await handProduct.deleteProduct(id)
		if (res.response === "success") {
			setProducts(res.data)
			alert("Delete Product Success")
		}
	}

	const handleEdit = (id) => {
		navigate(`/account/product/edit/${id}`)
	}

  return (
    <div className="table-responsive cart_info">
						<table className="table table-condensed">
							<thead>
								<tr className="cart_menu">
									<td className="image">image</td>
									<td className="description">name</td>
									<td className="price">price</td>
									
									<td className="total">action</td>
									
								</tr>
							</thead>
							<tbody>		
								{Object.values(products).length > 0 && Object.values(products).map((item) => {
									const image = item.image ? JSON.parse(item.image) : []
									return (
									<tr key={item.id}>
									<td className="cart_product">
										{image.length > 0 && (
											<Link to=""><img src={`http://localhost/laravel8/laravel8/public/upload/product/${user.id}/${image[0]}`} style={{ width: "130px", height: "70px" }} alt=""/></Link>
										)}
									</td>
									<td className="cart_description">
										<h4><Link to="">{item.name}</Link></h4>
										
									</td>
									<td className="cart_price">
										<p>{item.price}</p>
									</td>
									
									<td className="cart_total">
										<button onClick={() => handleEdit(item.id)}>edit</button>
										<button onClick={() => handleRemove(item.id)}>delete</button>
									</td>
								</tr>
									)
								})}
							</tbody>
						</table>
					</div>
  )
}
