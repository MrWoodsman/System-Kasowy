import { useEffect, useRef, useState } from "react";
import "./productList.scss";
import { useProducts } from "../../data/productsContext";

import { useEditMenu } from "../../data/editMenuContext";

export function ProductList() {
	const { openEditMenu } = useEditMenu();
	const { products } = useProducts();

	const [produkty, setProdukty] = useState([]);
	const [sortType, setSortType] = useState(1);
	const [sortDirection, setSortDirection] = useState(0);
	useEffect(() => {
		setProdukty(products);
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

	const bottomRef = useRef(null);
	const [lastLength, setLastLenght] = useState(products.length);

	const scrollToBottom = () => {
		if (products.length > lastLength) {
			setLastLenght(products.length);
			if (bottomRef.current) {
				bottomRef.current.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [produkty]);

	return (
		<div className="product_list">
			{/* <button
				onClick={() =>
					addProduct({ id: Date.now(), name: "test", value: 1, one_price: 5 })
				}
			>
				test
			</button> */}
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
				<tbody>
					{produkty
						? produkty.map((item, index) => {
								return (
									<tr
										key={index}
										db_id={item.id}
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
											{String(
												parseFloat(item.one_price * item.value).toFixed(2)
											).replace(".", ",")}{" "}
											zł
										</td>
									</tr>
								);
						  })
						: ""}
				</tbody>
			</table>
			<div ref={bottomRef}></div>
		</div>
	);
}
