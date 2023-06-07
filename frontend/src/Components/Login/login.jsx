import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
("use client");

// only import what you want to use
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
		<form className="flex max-w-md flex-col gap-4">
			<div>
				<div className="mb-2 block">
					<Label htmlFor="email" value="Your email" />
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
					<Label htmlFor="password1" value="Your password" />
				</div>
				<TextInput id="password1" required type="password" />
			</div>
			<Button type="submit">Submit</Button>
		</form>
	);
};
export default Login;
