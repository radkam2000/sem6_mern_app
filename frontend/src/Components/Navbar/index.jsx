import { LogoutBtn, ProfileDataBtn, HomeBtn } from "../Buttons";
import logo from "./logo192.png";

const Navbar = (props) => {
	return (
		<nav className="bg-slate-400 border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen flex flex-wrap items-center justify-between p-4">
				<div className="flex row">
					<img src={logo} className="h-8 mr-3" alt="React Logo" />
					<span className="self-start text-2xl font-semibold whitespace-nowrap dark:text-white">
						WatchIt
					</span>
				</div>
				{/* <div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				> */}
				<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-slate-400 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
					<li>
						<HomeBtn setContent={props.setContent} />
					</li>
					<li>
						<ProfileDataBtn
							setContent={props.setContent}
							setData={props.setData}
							setMsg={props.setMsg}
						/>
					</li>
					<li>
						<LogoutBtn />
					</li>
				</ul>
				{/* </div> */}
			</div>
		</nav>
	);
};

export default Navbar;
