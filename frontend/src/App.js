import { Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import Main from "./Components/Main";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
