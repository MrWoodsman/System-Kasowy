import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import App from "./App";
import { ProductsProvider } from "./data/productsContext";
import { EditMenuProvider } from "./data/editMenuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<ProductsProvider>
		<EditMenuProvider>
			<App />
		</EditMenuProvider>
	</ProductsProvider>
	// </React.StrictMode>
);
