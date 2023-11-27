import { useState } from "react";
import "./App.scss";

import {
	AddNewProduct,
	Footer,
	Navbar,
	OverflowMenu,
	ProductList,
} from "./components/components";

function App() {
	return (
		<div className="App">
			<OverflowMenu />
			<Navbar />
			<div className="main_box">
				<ProductList />
				<AddNewProduct />
			</div>
			<Footer />
		</div>
	);
}

export default App;
