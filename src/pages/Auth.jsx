import axios from "axios";
import { useState } from "react";
import { Authentication } from "../services/auth/Authentication";
import { useNavigate } from "react-router-dom";
import ErrorsComponent from "../components/ErrorsComponent";

export default function Auth() {
	const [errorsLogin, setErrorsLogin] = useState({})
	const [errorsRegister, setErrorsRegister] = useState({})
	const [dataRegister, setDataRegister] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		level: "0",

	})
	const [dataLogin, setDataLogin] = useState({
		email: "",
		password: "",
		level: "0",

	})
	const [avatar, setAvatar] = useState();
	const [file, setFile] = useState();
	const navigate = useNavigate()

	// Handle Register
	const handleFile = (e) => {
		const file = e.target.files;
		let reader = new FileReader();
		reader.onload = (e) => {
			setAvatar(e.target.result)
			setFile(file[0])
		}
		reader.readAsDataURL(file[0])
		
	}

	const handleOnchange = (e) => {
		const {name, value} = e.target;
		setDataRegister((prev) => ({...prev, [name]: value, avatar: avatar}))
	}

	const handleFormRegister = async (e) => {
		e.preventDefault()
		let errorSubmit = {}
		let flag = true
		if (dataRegister.name === "") {
			errorSubmit.name = "Vui long nhap name"
			flag = false
		}

		if (dataRegister.email === "") {
			errorSubmit.email = "Vui long nhap email"
			flag = false
		}

		if (dataRegister.password === "") {
			errorSubmit.password = "Vui long nhap password"
			flag = false
		}

		if (dataRegister.phone === "") {
			errorSubmit.phone = "Vui long nhap phone"
			flag = false
		}

		if (dataRegister.address === "") {
			errorSubmit.address = "Vui long nhap address"
			flag = false
		}

		if (!file) {
			errorSubmit.file = "Ban chua them hinh anh"
			flag = false
		}else {
			const type = ["png", "jpg", "jpeg", "PNG", "JPG"]
			const fileType = file.type.split("/").pop()
			const checkType = type.includes(fileType);
			if (!checkType) {
				errorSubmit.file = "Hinh anh chua dung dinh dang"
				flag = false
			}else {
				if (file.size > 1024 * 1024) {
					errorSubmit.file = "Size hinh anh khong phu hop"
					flag = false
				}
			}
			
		}

		if (!flag) {
			setErrorsRegister(errorSubmit)
		}else {
			const res = await Authentication.register(dataRegister)
			if (res.status === 200) {
				alert("Register Success")
				setErrorsRegister({})
			}
			setDataRegister({
				name: "",
				email: "",
				password: "",
				phone: "",
				address: "",
				level: "0",
			})
		}


		
	}

	// Handle Login

	const handleDataLogin = (e) => {
		const {name, value} = e.target;
		setDataLogin((prev) => ({...prev, [name]: value}))
	}

	const handleFormLogin = async (e) => {
		e.preventDefault()
		let errorSubmit = {}
		let flag = true
		if (dataLogin.email === "") {
			errorSubmit.email = "Vui long nhap email!"
			flag = false
		}

		if (dataLogin.password === "") {
			errorSubmit.password = "Vui long nhap password"
			flag = false
		}

		if (!flag) {
			setErrorsLogin(errorSubmit)
		}else {
			const res = await Authentication.login(dataLogin)	
			if (res.data.success === "success") {
				alert("Dang nhap thanh cong!")		
				localStorage.setItem("token", JSON.stringify(res.data.token))
				localStorage.setItem("user", JSON.stringify(res.data.Auth))
				navigate("/")
				setErrorsLogin({})
			}
			if (res.data.response === "error") {
				setErrorsLogin(res.data.errors)
			}
			setDataLogin({
				email: "",
				password: "",
			})
		}	
	}

	
  return (
    <section id="form">
		<div className="container">
			<div className="row">
				<div className="col-sm-4 col-sm-offset-1">
					<ErrorsComponent error={errorsLogin}/>
					<div className="login-form">
						<h2>Login to your account</h2>
						<form onSubmit={handleFormLogin}>
							<input type="email" value={dataLogin.email} name="email" placeholder="Email Address"  onChange={handleDataLogin}/>
							<input type="password" value={dataLogin.password} name="password" placeholder="Password"  onChange={handleDataLogin}/>
							<span>
								<input type="checkbox" className="checkbox"/> 
								Keep me signed in
							</span>
							<button type="submit" className="btn btn-default">Login</button>
						</form>
					</div>
				</div>
				<div className="col-sm-1">
					<h2 className="or">OR</h2>
				</div>
				<div className="col-sm-4">
				<ErrorsComponent error={errorsRegister}/>
					<div className="signup-form">
						<h2>New User Signup!</h2>
						<form onSubmit={handleFormRegister} encType="multipart/form-data">
							<input type="text" value={dataRegister.name} name="name" placeholder="Name" onChange={handleOnchange}/>
							<input type="email" value={dataRegister.email} name="email" placeholder="Email Address" onChange={handleOnchange}/>
							<input type="password" value={dataRegister.password} name="password" placeholder="Password" onChange={handleOnchange}/>
							<input type="number" value={dataRegister.phone} name="phone" placeholder="Phone" onChange={handleOnchange}/>
							<input type="text" value={dataRegister.address} name="address" placeholder="Address" onChange={handleOnchange}/>
							<input type="file" name="avatar" placeholder="Avatar" onChange={handleFile}/>
							<button type="submit" className="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
  )
}
