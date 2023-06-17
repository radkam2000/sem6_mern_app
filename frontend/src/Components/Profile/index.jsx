import { Accordion, FileInput, TextInput, Button } from "flowbite-react";
import { ChangePasswd, DeleteAccount } from "../Forms";
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle";
import { AccordionPanel } from "flowbite-react/lib/esm/components/Accordion/AccordionPanel";
import { useState } from "react";
import axios from "axios";

const Profile = (props) => {
	const user = props.data;

	const [data, setData] = useState({
		videoTitle: "",
		videoDesc: "",
		file: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleFileChange = (e) => {
		data.file = e.target.files[0];
		if (data.file) {
			const extension = data.file?.name.split(".").pop().toLowerCase();
			if (extension !== "mp4") {
				data.file = "";
				props.notify("Choose mp4 file");
			}
		}
	};

	const handleImport = async () => {
		const token = localStorage.getItem("token");
		if (data.file?.name.split(".").pop().toLowerCase() !== "mp4") {
			props.notify("Choose correct file");
			return;
		}

		if (data.videoDesc === "" || data.videoTitle === "") {
			props.notify("Fill form properly");
			return;
		}

		if (token) {
			try {
				const formData = new FormData();
				formData.append("file", data.file);
				formData.append("videoDesc", data.videoDesc);
				formData.append("videoTitle", data.videoTitle);
				const config = {
					method: "post",
					url: "http://localhost:5000/api/videos/upload/",
					headers: {
						"Content-Type": "multipart/form-data",
						"x-access-token": token,
					},
					data: formData,
				};
				const { data: res } = await axios(config);
				props.notify("File correctly send");
				setData({
					...data,
					videoTitle: "",
					videoDesc: "",
					file: "",
				});
				props.refreshVideos();
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					window.location.reload();
				}
			}
		}
	};

	return (
		<div>
			<Accordion>
				<Accordion.Panel>
					<Accordion.Title>Add new video</Accordion.Title>
					<Accordion.Content>
						<div style={{ width: "400px" }}>
							<FileInput
								type="file"
								name="file"
								onChange={handleFileChange}
							/>
							<TextInput
								type="text"
								placeholder="VideoTitle"
								name="videoTitle"
								onChange={handleChange}
								value={data.videoTitle}
								required
							/>
							<TextInput
								type="text"
								placeholder="VideoDesc"
								name="videoDesc"
								onChange={handleChange}
								value={data.videoDesc}
								required
							/>
							<Button onClick={handleImport}>Submit</Button>
						</div>
					</Accordion.Content>
				</Accordion.Panel>

				<Accordion.Panel>
					<Accordion.Title>Profile data</Accordion.Title>
					<Accordion.Content>
						First name: {user.firstName}
						<br />
						Last name: {user.lastName}
					</Accordion.Content>
				</Accordion.Panel>

				<Accordion.Panel>
					<Accordion.Title>Change your password</Accordion.Title>
					<Accordion.Content>
						<ChangePasswd />
					</Accordion.Content>
				</Accordion.Panel>

				<Accordion.Panel>
					<Accordion.Title>Delete your account</Accordion.Title>
					<Accordion.Content>
						<DeleteAccount />
					</Accordion.Content>
				</Accordion.Panel>
			</Accordion>
		</div>
	);
};

export default Profile;
