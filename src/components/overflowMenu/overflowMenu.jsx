import "./overflowMenu.scss";

import { useProducts } from "../../data/productsContext";
import { useEditMenu } from "../../data/editMenuContext";

import { useEffect, useRef, useState } from "react";

export function OverflowMenu({ title, content_type, custom_value }) {
	const { updateProduct } = useProducts();
	const {
		editMenuTitle,
		itemId,
		editMenuCustomValue,
		isEditMenuOpen,
		closeEditMenu,
	} = useEditMenu();

	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef(null);

	useEffect(() => {
		if (editMenuCustomValue) {
			// setInputValue(editMenuCustomValue);
			setInputValue("");
			if (isEditMenuOpen === true) {
				inputRef.current.focus();
			}
		}
	}, [isEditMenuOpen]);

	function handleChangeItemValue() {
		updateProduct(itemId, { value: inputValue });
		closeEditMenu();
	}

	const handleChange = (e) => {
		// Sprawdzenie, czy wartość jest liczbą
		const newValue = e.target.value;
		if (!isNaN(newValue)) {
			setInputValue(newValue);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			if (event.target.value) {
				updateProduct(itemId, { value: inputValue });
				closeEditMenu();
				console.log("Zmienianie liczby dla produktu");
			}
		} else if (event.key === "Escape") {
			closeEditMenu();
		}
	};

	if (isEditMenuOpen) {
		return (
			<div className="overflow_menu">
				<div className="overflow_menu-content">
					<h4 style={{ fontWeight: "500" }}>{editMenuTitle}</h4>
					<label htmlFor="value">
						Ilość:
						<input
							onKeyDown={handleKeyPress}
							ref={inputRef}
							placeholder={parseFloat(editMenuCustomValue).toFixed(3)}
							type="number"
							name="value"
							value={inputValue !== undefined ? inputValue : ""}
							onChange={handleChange}
						/>
					</label>
					<div className="button_box" style={{ display: "flex", gap: "16" }}>
						<button onClick={() => handleChangeItemValue()} className="accent">
							Potwierdź
						</button>
						<button onClick={() => closeEditMenu()}>Anuluj</button>
					</div>
				</div>
			</div>
		);
	}
}

OverflowMenu.defaultProps = {
	title: "Tytuł okna",
	custom_value: { zmiana_wartosci: 1.15 },
};
