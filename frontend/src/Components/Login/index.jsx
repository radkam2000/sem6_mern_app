import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Alert, Button, Label, TextInput } from "flowbite-react";

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
		<form
			className="flex max-w-md mx-auto my-12 flex-col gap-4"
			onSubmit={handleSubmit}
		>
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
			<div className="flex flex-row gap-2  block">
				New Here?
				<Link
					to="/signup"
					className="register_btn text-sky-800 underline"
				>
					Sign Up
				</Link>
			</div>{" "}
			{error && (
				<Alert color="failure" className="mt-2">
					<p>{error}</p>
				</Alert>
			)}
		</form>
	);
};

export default Login;
