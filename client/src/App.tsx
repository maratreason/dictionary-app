import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header/Header";
import Words from "./Words/Words";

function App() {
	const [words, setWords] = useState([]);

	const fetchData = async () => {
		const { data }: any = await axios.get("/api/v1/words");
		console.log("response", data);
		setWords(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	console.log(words);

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: "#333996",
				light: "#3c44b126"
			},
			secondary: {
				main: "#f83245",
				light: "#f8324526"
			},
			background: {
				default: "f4f5f6"
			}
		},
		overrides: {
			MuiAppBar: {
				root: {
					transform: "translateZ(0)"
				}
			}
		},
		props: {
			MuiIconButton: {
				disableRipple: true
			}
		}
	});

	const useStyles = makeStyles({
		appMain: {
			width: "100%"
		}
	})

	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.appMain}>
				<Header />
				<Words />
			</div>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default App;
