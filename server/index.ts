const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

import { router as wordsRoutes } from "./routes/words";

const app = express();

app.use(express.json());

// Подключаем доступ к статическим файлам из папки public.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Чтобы видеть в консоли передаваемые данные из формы

app.use("/api/v1/words", wordsRoutes);

const PORT = process.env.PORT || 5000;
const LOCAL_MONGODB_URI = "mongodb://localhost:27017/learn_words";

async function start() {
	try {
		await mongoose.connect(LOCAL_MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (e) {
		console.error(e.message);
	}
}

start();
