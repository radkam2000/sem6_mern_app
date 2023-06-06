import axios from "axios";
const ProfileDataBtn = (props) => {
	const handleGetUser = async (e) => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const config = {
					method: "get",
					url: "http://localhost:5000/api/user",
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token,
					},
				};
				const { data: res } = await axios(config);
				props.setData(res.data);
				props.setMsg(res.message);
				props.setContent("profile");
			} catch (error) {
				console.log(error);
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
	};
	return (
		<button
			className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
			onClick={handleGetUser}
		>
			Profile
		</button>
	);
};

export default ProfileDataBtn;
