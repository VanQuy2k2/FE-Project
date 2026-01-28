import blog_one from '../assets/images/blog/blog-one.jpg'
import blog_two from '../assets/images/blog/blog-two.jpg'
import blog_three from '../assets/images/blog/blog-three.jpg'
import { useEffect, useState } from 'react'
import { handleBlog } from '../services/blogs/handleBlog';
import { Link } from 'react-router-dom';

export default function Blog() {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		const loadDataBlog = async () => {
			const res = await handleBlog.getBlogs()
			setBlogs(res)
			
		}
		loadDataBlog()	
	}, [])
  return (
    <div className="blog-post-area">
		<h2 className="title text-center">Latest From our Blog</h2>
		{blogs.map((blog,index) => (
			<div key={index} className="single-blog-post">
				<h3>{blog.title}</h3>
				<div className="post-meta">
					<ul>
						<li><i className="fa fa-user"></i> Mac Doe</li>
						<li><i className="fa fa-clock-o"></i> 1:33 pm</li>
						<li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
					</ul>
					<span>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-half-o"></i>
					</span>
				</div>
				<a href="">
					 <img src={`http://localhost/laravel8/laravel8/public/upload/Blog/image/${blog.image}`} alt='blog_image'/>
				</a>
				<p>{blog.description}</p>
				<Link to={`/blog/detail/${blog.id}`} className="btn btn-primary" href="">Read More</Link>
			</div>
		))}
		
		<div className="pagination-area">
			<ul className="pagination">
				<li><a href="" className="active">1</a></li>
				<li><a href="">2</a></li>
				<li><a href="">3</a></li>
				<li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
			</ul>
		</div>
	</div>
  )
}
