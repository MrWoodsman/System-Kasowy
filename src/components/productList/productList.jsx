import { useEffect, useRef, useState } from "react";
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

	// const [actualSelectedProduct, setActualSelectedProduct] = useState(null);
	let actualSelectedProduct = 0;

	// const [activeProduct, setActiveProduct] = useState(0);

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

	function setSelectedProduct(num) {
		const allProducts = document.querySelectorAll(".product_item");
		allProducts.forEach((e) => {
			e.classList.remove("selected_product");
		});

		let toChange = actualSelectedProduct + num;

		allProducts[toChange].classList.add("selected_product");
		actualSelectedProduct = toChange;
	}

	// Wywołanie po załadowaniu produktów
	useEffect(() => {
		console.warn(products.length, lastLength);
		if (products.length > lastLength) {
			setLastLenght(products.length);

			const allProducts = document.querySelectorAll(".product_item");
			if (allProducts.length > 0) {
				allProducts.forEach((e) => {
					e.classList.remove("selected_product");
				});

				actualSelectedProduct = allProducts.length - 1;

				const lastAllProducts = allProducts[allProducts.length - 1];
				lastAllProducts.classList.add("selected_product");
			}
		}
		scrollToBottom();
	}, [localProducts]);

	// Przesuwanie na sam dół jesli lista sie zmieniła
	const [lastLength, setLastLenght] = useState(0);

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

	// Sterowanie wybranym elementem Góra / Dół
	const handleKeyDown = (event) => {
		const allProducts = document.querySelectorAll(".product_item");

		if (allProducts.length > 0) {
			if (event.key === "ArrowUp") {
				if (actualSelectedProduct > 0) {
					setSelectedProduct(-1);
				} else if (actualSelectedProduct === 0) {
					setSelectedProduct(allProducts.length - 1);
				}
			} else if (event.key === "ArrowDown") {
				if (actualSelectedProduct < allProducts.length - 1) {
					setSelectedProduct(1);
				} else if (actualSelectedProduct >= allProducts.length - 1) {
					setSelectedProduct(-(allProducts.length - 1));
				}
			} else if (event.key === "Control") {
				let ProductValue =
					allProducts[actualSelectedProduct].getAttribute("element_value");
				let ProductId =
					allProducts[actualSelectedProduct].getAttribute("db_id");
				console.log(ProductValue, ProductId);
				openEditMenu(
					"Zmiana liczby produktu",
					parseFloat(ProductValue),
					parseInt(ProductId)
				);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		// Clean-up effect
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

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
