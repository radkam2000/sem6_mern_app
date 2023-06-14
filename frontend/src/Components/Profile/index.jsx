import { Accordion } from "flowbite-react";
import { ChangePasswd, DeleteAccount } from "../Forms";
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle";
import { AccordionPanel } from "flowbite-react/lib/esm/components/Accordion/AccordionPanel";
import { useState, useRef } from "react";
import axios from "axios";

const Profile = (props) => {
	const user = props.data;

	const inputFile = useRef(null);
	const chooseFile = async () => {
		inputFile.current.click();
	};

	const handleImport = async (file) => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const formData = new FormData();
				formData.append("file", file);
				const config = {
					method: "post",
					url: "http://localhost:5000/api/upload/",
					headers: {
						"Content-Type": "multipart/form-data",
						"x-access-token": token,
					},
					data: formData,
				};
				const { data: res } = await axios(config);
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
					<Accordion.Title>Profile data</Accordion.Title>
					<Accordion.Content>
						<button onClick={chooseFile}>Importuj</button>
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
