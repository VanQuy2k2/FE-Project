import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handProduct } from '../services/product/handleProduct';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Product_Detail() {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [brand, setBrand] = useState([])
    const navigate = useNavigate()
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
        const loadBrandCategory = async () => {
            const res = await handProduct.brandCategory()
           if (res.message === "success") {
                setBrand(res.brand)
           }
           
        }
        loadBrandCategory()
    }, [])
    

    const handleAddToCard = (id) => {
        const qty = Number(quantity)
        const cart = JSON.parse(localStorage.getItem("data")) || {}
        if (cart[id]) {
            cart[id] += qty 
        }else {
            cart[id] = qty;
        }
        localStorage.setItem("data", JSON.stringify(cart))
        navigate("/cart")

    }
    const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,   // 👉 hiển thị 3 hình cùng lúc
      slidesToSlide: 1
    }
  };
    const images = product.image ? JSON.parse(product.image) : [] 
  return (
    <div className="product-details">
        <div className="col-sm-5">
            <div className="view-product">
                <img src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${images[0]}`} alt="" />
                <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                
            </div>
            <div className="similar-product">
                <Carousel
                    responsive={responsive}
                    arrows={true}
                    infinite={true}
                    autoPlay={false}
                    showDots={false}
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-40-px"
                >
                {images.length > 0 && images.map((img,index) => (
                    <a key={index} href="#">
                        <img 
                        src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${img}`} 
                        alt=""
                        style={{width: "85px", height: "85px"}}
                         />
                    </a>
                ))}
                </Carousel>
            </div>


        </div>
        <div className="col-sm-7">
            <div className="product-information">
                <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                <h2>{product.name}</h2>
                <p>Web ID: {product.web_id}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                    <span>US ${product.price}</span>
                    <label>Quantity:</label>
                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    <button onClick={() => handleAddToCard(product.id)} type="button" className="btn btn-fefault cart">
                        <i className="fa fa-shopping-cart"></i>
                        Add to cart
                    </button>
                </span>
                <p><b>Availability:</b> In Stock</p>
                <p><b>Condition:</b>{product.status === 0 ? " New" : " Sale"}</p>
                <p><b>Brand:</b> {brand.length > 0 && brand.map(item => item.id === product.id_brand ? item.brand : null)}</p> 
                <a href=""><img src="images/product-details/share.png" className="share img-responsive"  alt="" /></a>
            </div>
        </div>
    </div>
  )
}
