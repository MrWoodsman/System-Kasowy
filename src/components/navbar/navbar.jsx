import { useEffect, useState } from "react";
import "./navbar.scss";

export function Navbar() {
	const [time, setTime] = useState("00:00:00");

	useEffect(() => {
		updateClock();
	}, []);

	function updateClock() {
		let date = new Date();

		let h = String(date.getHours()).padStart(2, "0");
		let m = String(date.getMinutes()).padStart(2, "0");
		let s = String(date.getSeconds()).padStart(2, "0");

		setTime(`${h}:${m}:${s}`);
	}
	setInterval(updateClock, 1000);

	return (
		<div className="navbar">
			<h3>Lista Produktów</h3>

			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					flexDirection: "column",
				}}
			>
				<h4 style={{ fontWeight: "600" }}>{time}</h4>
				<h5 style={{ fontWeight: "500" }}>Kasjer nr.2</h5>
			</div>
		</div>
	);
}
