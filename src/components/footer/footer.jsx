import { useEffect, useState } from "react";
import { useProducts } from "../../data/productsContext";
import "./footer.scss";

export function Footer() {
	const { products } = useProducts();
	const [sum, setSum] = useState(0);

	useEffect(() => {
		let totalSum = 0;

		products.forEach((item) => {
			totalSum += item.value * item.one_price;
		});

		setSum(parseFloat(totalSum).toFixed(2));
	}, [products]);

	return (
		<div className="footer">
			<h1 className="sum_value" style={{ fontWeight: "700" }}>
				Suma: <span>{sum} zł</span>
			</h1>
		</div>
	);
}
