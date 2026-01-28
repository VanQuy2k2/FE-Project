import man_one from '../assets/images/blog/man-one.jpg'
import socials from '../assets/images/blog/socials.png'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { handleBlog } from '../services/blogs/handleBlog'
import { handleComments } from '../services/comments/handleComment'
import ListComment from '../components/ListComment'

const token = JSON.parse(localStorage.getItem("token"))
const user = JSON.parse(localStorage.getItem("user"))
export default function Blog_Detail() {
	const {id} = useParams()
	const [blog, setBlog] = useState(null)
	const [textArea, setTextArea] = useState("")
	const [listComment, setListComment] = useState([])
	const refTextArea = useRef();
	const refComment = useRef();
	const [replyId, setReplyId] = useState(null);

	useEffect(() => {
		if(!id) return;
			const loadDetailProduct = async () => {
			const res = await handleBlog.getDetailBlog(id);	
			setBlog(res)	
			setListComment(res.comment)

	}
		loadDetailProduct()
	},[id])

	const handleTextArea = async () => {
		if (!token) {
			alert("Vui long login")
			return
		}
		else if (!textArea) {
			alert("Nhap binh luan")
			return
		}
		const DataComment = {
			id_blog: id,
			id_user: user.id,
			name_user: user.name,
			id_comment: replyId ?? 0,
			comment: textArea,
			image_user: user.avatar,
		}
		const res = await handleComments.postComments(DataComment)
		setListComment(prev => [res, ...prev])
		refComment.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		})
		setTextArea("")
	}

	const handleReplyFromChild = (id) => {
		setReplyId(id)
		refTextArea.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
		refTextArea.current?.focus();
	}
  return (
    <main>
        <div className="blog-post-area">
						<h2 className="title text-center">Latest From our Blog</h2>
						{blog && <div className="single-blog-post">
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
							<div className="pager-area">
								<ul className="pager pull-right">
									<li><a href="#">Pre</a></li>
									<li><a href="#">Next</a></li>
								</ul>
							</div>
						</div>
						}
					</div>

					<div className="rating-area">
						<ul className="ratings">
							<li className="rate-this">Rate this item:</li>
							<li>
								<i className="fa fa-star color"></i>
								<i className="fa fa-star color"></i>
								<i className="fa fa-star color"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
							</li>
							<li className="color">(6 votes)</li>
						</ul>
						<ul className="tag">
							<li>TAG:</li>
							<li><a className="color" href="">Pink <span>/</span></a></li>
							<li><a className="color" href="">T-Shirt <span>/</span></a></li>
							<li><a className="color" href="">Girls</a></li>
						</ul>
					</div>

					<div className="socials-share">
						<a href=""><img src={socials} alt=""/></a>
					</div>

					 <div className="media commnets">
						<a className="pull-left" href="#">
								<img className="media-object" src={man_one} alt=""/>
						</a>
						<div className="media-body">
							<h4 className="media-heading">David</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div className="blog-socials">
								<ul>
									<li><a href=""><i className="fa fa-facebook"></i></a></li>
									<li><a href=""><i className="fa fa-twitter"></i></a></li>
									<li><a href=""><i className="fa fa-dribbble"></i></a></li>
									<li><a href=""><i className="fa fa-google-plus"></i></a></li>
								</ul>
								<a className="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> 
					<ListComment listComment={listComment} onReply={handleReplyFromChild}  refComment={refComment}/>
					<div className="replay-box">
						<div className="row">
							<div className="col-sm-12">
								<h2>Leave a replay</h2>
								
								<div className="text-area">
									<div className="blank-arrow">
										<label>Your Name</label>
									</div>
									<span>*</span>
									<textarea ref={refTextArea} onChange={(e) => setTextArea(e.target.value)} value={textArea} className='border_comment' name="message" rows="11"></textarea>
									<button onClick={handleTextArea} className="btn btn-primary">post comment</button>
								</div>
							</div>
						</div>
					</div>
                    <br/>
    </main>
  );
}
