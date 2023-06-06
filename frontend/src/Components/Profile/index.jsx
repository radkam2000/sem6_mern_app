import { ChangePasswd, DeleteAccount } from "../Forms";

const Profile = (props) => {
	const user = props.data;

	return (
		<div className="data">
			{user.firstName}
			<br />
			{user.lastName}

			<ChangePasswd />
			<DeleteAccount />
		</div>
	);
};

export default Profile;
