import React, { createContext, useContext, useState } from "react";

// Utwórz kontekst
const ProductsContext = createContext();

const ListaProduktów = {
	91: { name: "Bułka", one_price: 0.39 },
	66106: { name: "Marchewka", one_price: 5.99 },
	102: { name: "Jogurt naturalny", one_price: 2.49 },
	205: { name: "Pomidor", one_price: 3.29 },
	307: { name: "Chleb pszenny", one_price: 4.49 },
	411: { name: "Jajka (10 sztuk)", one_price: 9.99 },
	523: { name: "Mleko pełnotłuste", one_price: 1.79 },
	639: { name: "Czekolada mleczna", one_price: 6.79 },
	701: { name: "Kawa ziarnista", one_price: 12.99 },
	821: { name: "Ser żółty", one_price: 16.49 },
	937: { name: "Herbata czarna", one_price: 3.99 },
	1042: { name: "Woda mineralna (1.5L)", one_price: 1.29 },
	1153: { name: "Ryż basmati", one_price: 4.79 },
	1267: { name: "Pierś z kurczaka (1 kg)", one_price: 21.99 },
	1382: { name: "Płatki owsiane", one_price: 2.89 },
	1499: { name: "Sałata lodowa", one_price: 2.19 },
	1583: { name: "Masło extra", one_price: 3.69 },
	1678: { name: "Mąka pszenna", one_price: 1.49 },
	1789: { name: "Papryka czerwona", one_price: 4.99 },
	1888: { name: "Kiełbasa wiejska", one_price: 8.49 },
	1997: { name: "Cebula", one_price: 1.09 },
	2105: { name: "Oliwa z oliwek", one_price: 7.99 },
	2213: { name: "Jogurt owocowy", one_price: 1.89 },
	2319: { name: "Jabłko Granny Smith", one_price: 1.29 },
	2430: { name: "Pomarańcza", one_price: 2.49 },
	2546: { name: "Kasza gryczana", one_price: 3.69 },
	2671: { name: "Chipsy ziemniaczane", one_price: 2.79 },
	2783: { name: "Pieczeń wieprzowa", one_price: 11.99 },
	2895: { name: "Ketchup", one_price: 1.59 },
	2998: { name: "Piwo jasne", one_price: 2.79 },
	3104: { name: "Kurczak cały", one_price: 6.99 },
	3211: { name: "Cukier biały", one_price: 1.19 },
	3322: { name: "Sok pomidorowy", one_price: 2.29 },
	3436: { name: "Makaron penne", one_price: 1.99 },
	3550: { name: "Szpinak świeży", one_price: 3.49 },
	3666: { name: "Czekolada gorzka", one_price: 4.99 },
	3781: { name: "Miód naturalny", one_price: 8.99 },
	3897: { name: "Ser feta", one_price: 5.49 },
	4010: { name: "Kawa rozpuszczalna", one_price: 7.29 },
	4125: { name: "Mleko kokosowe", one_price: 2.99 },
	4240: { name: "Kurkuma", one_price: 2.39 },
	4356: { name: "Kapusta biała", one_price: 1.79 },
	4472: { name: "Kiełki lucerny", one_price: 2.09 },
	4590: { name: "Drożdże piekarskie", one_price: 1.29 },
	4705: { name: "Mięso mielone (1 kg)", one_price: 10.99 },
	4820: { name: "Czosnek", one_price: 0.99 },
};

// Utwórz dostawcę kontekstu, który zawiera stan i funkcje manipulujące stanem
export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	// const addProduct = (newProduct) => {
	// 	setProducts((prevProducts) => [...prevProducts, newProduct]);
	// };
	const optimizeList = (products) => {
		const optimizedList = products.reduce((result, product) => {
			const existingProduct = result.find((item) => item.kod === product.kod);

			if (existingProduct) {
				// Jeśli produkt o takim kodzie już istnieje, dodaj wartość value
				existingProduct.value += product.value;
			} else {
				// Jeśli produkt o takim kodzie nie istnieje, dodaj go do listy
				result.push({ ...product });
			}

			return result;
		}, []);

		console.log(optimizedList);
	};

	const addProduct = (kod) => {
		// Pobierz produkt z obiektu ListaProduktów na podstawie kodu
		const newProduct = ListaProduktów[kod];

		// Sprawdź, czy produkt istnieje w liście
		if (newProduct) {
			// Dodaj produkt do listy, ustawiając jako id wartość kodu
			setProducts((prevProducts) => [
				...prevProducts,
				{ ...newProduct, id: Date.now(), kod: parseInt(kod), value: 1 },
			]);
		} else {
			console.error(`Produkt o kodzie ${kod} nie istnieje.`);
		}

		optimizeList(products);
	};

	const updateProduct = (productId, updatedData) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === productId ? { ...product, ...updatedData } : product
			)
		);
	};

	const removeProduct = (productId) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== productId)
		);
	};

	return (
		<ProductsContext.Provider
			value={{ products, addProduct, updateProduct, removeProduct }}
		>
			{children}
		</ProductsContext.Provider>
	);
};

// Utwórz niestandardowy hook, który pozwoli na łatwe korzystanie z kontekstu
export const useProducts = () => {
	const context = useContext(ProductsContext);
	if (!context) {
		throw new Error("useProducts must be used within a ProductsProvider");
	}
	return context;
};
