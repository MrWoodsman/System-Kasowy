import "./addNewProduct.scss";

import { useProducts } from "../../data/productsContext";

export function AddNewProduct() {
	const { addProduct } = useProducts();

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			if (event.target.value) {
				// Tutaj wykonaj dowolne działania, które mają być wykonane po naciśnięciu Enter
				addProduct(event.target.value);
				// console.log("Dodawanie prodktu o kodzie: ", event.target.value);
				event.target.value = "";
			}
		}
	};

	return (
		<div className="add_new_product">
			<label htmlFor="new_product">
				<h5>Dodaj</h5>
				<input
					type="text"
					id="new_product"
					name="new_product"
					autoComplete="off"
					onKeyDown={handleKeyPress}
				/>
			</label>
		</div>
	);
}
