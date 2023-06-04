import { useState } from "react";
import axios from "axios";

const ChangePasswd = (props) => {
	const [data, setData] = useState({ oldPassword: "", newPassword: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		try {
			const config = {
				method: "post",
				url: "http://localhost:5000/api/user/password",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": token,
				},
				data: data,
			};
			const { data: res } = await axios(config);
			props.msg(res.message);
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
		<div className="form_container">
			<form onSubmit={handleSubmit}>
				<input
					type="password"
					placeholder="Password"
					name="oldPassword"
					onChange={handleChange}
					value={data.oldPassword}
					required
					className="form_container__input"
				/>
				<input
					type="password"
					placeholder="Password"
					name="newPassword"
					onChange={handleChange}
					value={data.newPassword}
					required
					className="form_container__input"
				/>
				{error && (
					<div className="form_container__error-msg">{error}</div>
				)}
				<button type="submit" className="login-btn">
					Zmien haslo
				</button>
			</form>
		</div>
	);
};

export default ChangePasswd;
