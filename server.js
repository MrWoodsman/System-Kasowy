const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// Serwowanie plików statycznych z folderu 'build'
app.use(express.static(path.join(__dirname, "build")));

// Obsługa żądań na główną stronę (index.html)
app.get("/", (req, res) => {
	console.log("Strona została wyświetlona przez klienta!");
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ! Pamiętaj przez zbudowac aplikacje React
// ! npm run build
// Nasłuch na określonym porcie
app.listen(port, () => {
	console.log(`Serwer uruchomiony na porcie http://localhost:${port}/`);
});
