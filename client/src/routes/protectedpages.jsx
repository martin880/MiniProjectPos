import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
	children,
	guestOnly = false,
	needLogin = false,
	noFooter = false,
}) {
	const userSelector = useSelector((state) => state.login.auth);
	const nav = useNavigate();

	console.log(userSelector);
	console.log(children);

	useEffect(() => {
		console.log(guestOnly);
		console.log(needLogin);
		console.log(userSelector?.email);
		if (guestOnly && userSelector?.email) {
			console.log(userSelector.email);
			return nav("/cashier");
		} else if (needLogin && !userSelector?.email) {
			console.log(userSelector.email);
			return nav("/login");
		}
	}, [userSelector]);

	return (
		<>
			<>{children}</>
		</>
	);
}
