import "./App.css";
import routes from "./routes/routes";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<Routes>{routes.map((val) => val)}</Routes>
		</>
	);
}

export default App;
