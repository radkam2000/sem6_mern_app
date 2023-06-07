import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Alert, Button, Label, TextInput } from "flowbite-react";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/user/register";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
					<Label htmlFor="firstName" value="First Name" />
				</div>
				<TextInput
					placeholder="First Name"
					name="firstName"
					id="firstName"
					onChange={handleChange}
					value={data.firstName}
					required
				/>
			</div>
			<div>
				<div className="mb-2 block">
					<Label htmlFor="lastName" value="Last Name" />
				</div>
				<TextInput
					placeholder="Last Name"
					name="lastName"
					id="lastName"
					onChange={handleChange}
					value={data.lastName}
					required
				/>
			</div>
			<div>
				<div className="mb-2 block">
					<Label htmlFor="email" value="Email" />
				</div>
				<TextInput
					type="email"
					placeholder="Email"
					name="email"
					id="email"
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
					type="password"
					placeholder="Password"
					name="password"
					id="password"
					onChange={handleChange}
					value={data.password}
					required
				/>
			</div>
			<Button type="submit">Submit</Button>
			<div className="flex flex-row gap-2  block">
				Welcome back.
				<Link
					to="/login"
					className="register_btn text-sky-800 underline"
				>
					Sign in
				</Link>
			</div>
			{error && (
				<Alert color="failure" className="mt-2">
					<p>{error}</p>
				</Alert>
			)}
		</form>
	);
};

export default Signup;
