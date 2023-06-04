import axios from "axios";
import { useState } from "react";
const DeleteAccount = (props) => {
	const [data, setData] = useState({ password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleAccountDelete = async () => {
		if (window.confirm("Na pewno chcesz usunac konto?") === true) {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const config = {
						method: "delete",
						url: "http://localhost:5000/api/user",
						headers: {
							"Content-Type": "application/json",
							"x-access-token": token,
						},
					};
					const { data: res } = await axios(config);
					props.data = res.data;
					props.msg = res.message;
					localStorage.removeItem("token");
					window.location.reload();
				} catch (error) {
					if (
						error.response &&
						error.response.status >= 400 &&
						error.response.status <= 500
					) {
						localStorage.removeItem("token");
						window.location.reload();
					}
				}
			}
		}
	};
	return (
		<div className="form_container">
			<form onSubmit={handleAccountDelete}>
				<input
					type="password"
					placeholder="Password"
					name="Password"
					onChange={handleChange}
					value={data.password}
					required
					className="form_container__input"
				/>
				{error && (
					<div className="form_container__error-msg">{error}</div>
				)}
				<button type="submit" className="login-btn">
					Usun konto
				</button>
			</form>
		</div>
	);
};

export default DeleteAccount;
