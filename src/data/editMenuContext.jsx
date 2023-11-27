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
