import { useEffect, useState } from "react";
import "./productList.scss";
import { useProducts } from "../../data/productsContext";

import { useEditMenu } from "../../data/editMenuContext";

function AllProductsTable({ produkty }) {
	const { openEditMenu } = useEditMenu();

	// Use the `return` statement to return JSX elements
	return (
		<tbody>
			{produkty.map((item, index) => (
				<tr
					item_index={index}
					className="product_item"
					key={index}
					db_id={item.id}
					element_value={parseFloat(item.value).toFixed(3)}
					onClick={() =>
						openEditMenu(
							"Zmiana liczby produktu",
							parseFloat(item.value),
							item.id
						)
					}
				>
					<td>{index + 1}</td>
					<td>{item.kod}</td>
					<td>{item.name}</td>
					<td>{String(item.one_price).replace(".", ",")} zł</td>
					<td>{parseFloat(item.value).toFixed(3)}</td>
					<td>
						{String(parseFloat(item.one_price * item.value).toFixed(2)).replace(
							".",
							","
						)}{" "}
						zł
					</td>
				</tr>
			))}
		</tbody>
	);
}

export function ProductList() {
	const { openEditMenu } = useEditMenu();

	const { products } = useProducts();

	const [localProducts, setLocalProducts] = useState([]);
	const [sortType, setSortType] = useState(1);
	const [sortDirection, setSortDirection] = useState(0);

	useEffect(() => {
		setLocalProducts(products);
	}, [products]);

	const sortDirections = ["bi bi-caret-down-fill", "bi bi-caret-up-fill"];
	const sortTypes = ["Lp", "Nazwa", "Cena za 1szt.", "Ilość", "Cena"];

	function handleSort(num) {
		if (num === sortType) {
			if (sortDirection + 1 > 1) {
				setSortDirection(0);
			} else {
				setSortDirection(sortDirection + 1);
			}
		} else {
			setSortType(num);
			console.log(sortTypes[num - 1]);
		}
	}

	function findElementByIndex(num) {
		const productsItems = document.querySelectorAll(".product_item");

		for (const e of productsItems) {
			if (e.getAttribute("item_index") == num) {
				return e;
			}
		}

		// If the loop completes without finding the element, return null or handle appropriately.
		return null;
	}

	function findElementWithMinIndex() {
		const productsItems = document.querySelectorAll(".product_item");

		let minIndexElement = null;
		let minIndex = Infinity;

		for (const e of productsItems) {
			const currentIndex = parseInt(e.getAttribute("item_index"));

			if (!isNaN(currentIndex) && currentIndex < minIndex) {
				minIndex = currentIndex;
				minIndexElement = e;
			}
		}

		return minIndexElement;
	}

	function findElementWithMaxIndex() {
		const productsItems = document.querySelectorAll(".product_item");

		let maxIndexElement = null;
		let maxIndex = -Infinity;

		for (const e of productsItems) {
			const currentIndex = parseInt(e.getAttribute("item_index"));

			if (!isNaN(currentIndex) && currentIndex > maxIndex) {
				maxIndex = currentIndex;
				maxIndexElement = e;
			}
		}

		return maxIndexElement;
	}

	function removeSelectedProductClass() {
		const selectedProducts = document.querySelectorAll(".selected_product");

		selectedProducts.forEach((element) => {
			element.classList.remove("selected_product");
		});
	}

	// Wywołanie po załadowaniu produktów
	useEffect(() => {
		setLastLenght(products.length);
		test();
	}, [localProducts]);

	function test() {
		// console.warn(products.length, lastLength);
		if (products.length > lastLength) {
			setLastLenght(products.length);

			// const allProducts = document.querySelectorAll(".product_item");
			// if (allProducts.length > 0) {
			// 	allProducts.forEach((e) => {
			// 		e.classList.remove("selected_product");
			// 	});

			// 	setActualSelectedProduct(allProducts.length - 1);

			// 	const lastAllProducts = allProducts[allProducts.length - 1];
			// 	lastAllProducts.classList.add("selected_product");
			// }
		}
		scrollToBottom();
	}
	// Przesuwanie na sam dół jesli lista sie zmieniła
	const [lastLength, setLastLenght] = useState(0);

	const [selectedProductNum, setSelectedProductNum] = useState(null);

	const scrollToBottom = () => {
		if (products.length > lastLength) {
			const el = document.getElementById("product_list");
			el.scrollTo({
				top: el.children[0].offsetHeight,
				left: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<div id="product_list">
			<table>
				<thead>
					<tr>
						<td onClick={() => handleSort(1)}>
							Lp.
							{sortType === 1 ? (
								<i className={sortDirections[sortDirection]}></i>
							) : (
								""
							)}
						</td>
						<td>Kod</td>
						<td onClick={() => handleSort(2)}>
							Nazwa
							{sortType === 2 ? (
								<i className={sortDirections[sortDirection]}></i>
							) : (
								""
							)}
						</td>
						<td onClick={() => handleSort(3)}>
							Cena 1szt.
							{sortType === 3 ? (
								<i className={sortDirections[sortDirection]}></i>
							) : (
								""
							)}
						</td>
						<td onClick={() => handleSort(4)}>
							Ilość
							{sortType === 4 ? (
								<i className={sortDirections[sortDirection]}></i>
							) : (
								""
							)}
						</td>
						<td onClick={() => handleSort(5)}>
							Cena
							{sortType === 5 ? (
								<i className={sortDirections[sortDirection]}></i>
							) : (
								""
							)}
						</td>
					</tr>
				</thead>
				<AllProductsTable produkty={localProducts} />
			</table>
		</div>
	);
}
