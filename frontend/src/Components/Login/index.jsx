import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
	Button,
	Checkbox,
	FileInput,
	Label,
	Radio,
	RangeSlider,
	Select,
	Textarea,
	TextInput,
	ToggleSwitch,
} from "flowbite-react";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/auth/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	return (
		<div className="login_container">
			<div className="login_container__form">
				<div className="login_container__form__left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="form_container__input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="form_container__input"
						/>
						{error && (
							<div className="form_container__error-msg">
								{error}
							</div>
						)}
						<button type="submit" className="login-btn">
							Sign In
						</button>
					</form>
				</div>
				<div className="login_form__container__right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="register_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

{
	/* <form
			className="flex max-w-md flex-col gap-4 mx-auto my-12"
			onSubmit={handleSubmit}>
			<div>
				<div className="mb-2 block">
					<Label htmlFor="email" value="Email" />
				</div>
				<TextInput
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
				/>
			</div>
			<div>
				<div className="mb-2 block">
					<Label htmlFor="password" value="Password" />
				</div>
				<TextInput
					id="password"
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
				/>
			</div>
			<Button type="submit">Submit</Button>
		</form> */
}
export default Login;
