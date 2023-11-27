<<<<<<< HEAD
// DialogContext.js
import React, { createContext, useContext, useState } from "react";

// Context do otwierania i zamykania dodatkwoego menu bocznego
const EditMenuContext = createContext();

export const useEditMenu = () => {
	return useContext(EditMenuContext);
};

export const EditMenuProvider = ({ children }) => {
	const [isEditMenuOpen, SetEditMenuOpen] = useState(false);
	const [editMenuTitle, setEditMenuTitle] = useState("Tytuł Okna");
	const [editMenuCustomValue, setEditMenuCustomValue] = useState(null);
	const [itemId, setItemId] = useState(null);

	const openEditMenu = (title, value, id) => {
		console.log("otwarto");
		SetEditMenuOpen(true);
		setEditMenuTitle(title);
		setEditMenuCustomValue(parseFloat(value));
		setItemId(id);
	};

	const closeEditMenu = () => {
		console.log("zamknieto");
		SetEditMenuOpen(false);

		const inputElement = document.getElementById("new_product");

		if (inputElement) {
			inputElement.focus();
		}
	};

	return (
		<EditMenuContext.Provider
			value={{
				isEditMenuOpen,
				openEditMenu,
				closeEditMenu,
				editMenuTitle,
				editMenuCustomValue,
				itemId,
			}}
		>
			{children}
		</EditMenuContext.Provider>
	);
};
=======
// DialogContext.js
import React, { createContext, useContext, useState } from "react";

// Context do otwierania i zamykania dodatkwoego menu bocznego
const EditMenuContext = createContext();

export const useEditMenu = () => {
	return useContext(EditMenuContext);
};

export const EditMenuProvider = ({ children }) => {
	const [isEditMenuOpen, SetEditMenuOpen] = useState(false);
	const [editMenuTitle, setEditMenuTitle] = useState("Tytuł Okna");
	const [editMenuCustomValue, setEditMenuCustomValue] = useState(null);
	const [itemId, setItemId] = useState(null);

	const openEditMenu = (title, value, id) => {
		console.log("otwarto");
		SetEditMenuOpen(true);
		setEditMenuTitle(title);
		setEditMenuCustomValue(parseFloat(value));
		setItemId(id);
	};

	const closeEditMenu = () => {
		console.log("zamknieto");
		SetEditMenuOpen(false);

		const inputElement = document.getElementById("new_product");

		if (inputElement) {
			inputElement.focus();
		}
	};

	return (
		<EditMenuContext.Provider
			value={{
				isEditMenuOpen,
				openEditMenu,
				closeEditMenu,
				editMenuTitle,
				editMenuCustomValue,
				itemId,
			}}
		>
			{children}
		</EditMenuContext.Provider>
	);
};
>>>>>>> 8db75f9c2fcc7766c7e77cd188b6fba6b6b68574
