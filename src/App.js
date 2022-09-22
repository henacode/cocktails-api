import "./App.scss";
import React from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { Typography, Paper, AppBar, Toolbar, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme, lighten, responsiveFontSizes } from "@mui/material/styles";
import Item from "./components/Item";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import List from "./components/List";
import blue from "@mui/material/colors/blue";
import Link from "@mui/material/Link";

let theme = createTheme({
  palette: {
    background: {
      default: "#f2f4f8"
    },
    primary: {
      main: "#595a5a",
      contrastText: "#fff",
      backgroundColor: "#f2f4f8",
    },
  },
  shape: {
    borderRadius: 0,
    boxShadow: "",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        "&:hover": { textDecoration: "underline" },
        underline: "always",
        primary: { color: "#fff", textDecoration: "underline" },
      },
    },

    // MuiButton: {
    //   styleOverrides: {
    //     primary: { backgroundColor: "#595a5a" }
    //   }
    // }
  },
});
theme = responsiveFontSizes(theme);

function App() {
  const [jsonResults, setJsonResults] = useState();
  const [inputValue, setInputValue] = useState("");

  //get items
  const getJsonResults = async () => {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    if (response.data.drinks) {
      setJsonResults(response.data.drinks);
    }
  };

  getJsonResults();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Link component={RouterLink} to="/">
          <Box
            component="img"
            sx={{
              maxWidth: "100%",
              mt: 3,
              height: "auto",
              width: 200,
            }}
            alt="Cocktail Search"
            src="/LogoCocktail.png"
          />
        </Link>
        {/* <AppBar position="relative">
          <Link sx={{ color: "white" }} component={RouterLink} to="/">
            <Toolbar>
              <LocalBarIcon />
              <Typography variant="h5">Search cocktail</Typography>
            </Toolbar>
          </Link>
        </AppBar>
        <Typography variant="h1" align="center" color="TextPrimary" gutterBottom>
          Search cocktail
        </Typography> */}
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              You can find some cocktails on this site
            </Typography>
            <FormControl fullWidth sx={{ maxWidth: "md", borderRadius: 0, boxShadow: "0 3px 6px rgba(0, 0, 0, 0.11), 0 6px 12px rgba(220, 233, 255, 0.27)" }}>
              <Autocomplete
                sx={{ p: 0, backgroundColor: "#fff", borderRadius: 0 }}
                inputValue={inputValue}
                onInputChange={(event, value, reason) => {
                  if (event && event.type === "blur") {
                    setInputValue("");
                  } else if (reason !== "reset") {
                    setInputValue(value);
                  }
                }}
                freeSolo
                renderOption={(props, jsonResults) => {
                  const thumbUrl = jsonResults.strDrinkThumb + "/preview";
                  return (
                    <Box component="li" {...props} key={jsonResults.idDrink}>
                      <Fragment>
                        <Box
                          component="img"
                          sx={{
                            height: 30,
                            width: 30,
                          }}
                          alt={jsonResults.strDrink}
                          src={thumbUrl}
                        />
                        &nbsp;
                        <Link component={RouterLink} to={`/Cocktail/(${jsonResults.idDrink})-${jsonResults.strDrink}`}>
                          {jsonResults.strDrink} - {jsonResults.strAlcoholic} {jsonResults.strCategory}
                        </Link>
                      </Fragment>
                    </Box>
                  );
                }}
                options={jsonResults ? jsonResults : []}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(jsonResults) => `${jsonResults.strDrink}`}
                onChange={(event, item) => {
                  if (item) {
                    setInputValue(item.strDrink);
                  }
                }}
                //open={inputValue.length > 2}
                renderInput={(params) => <TextField {...params} label="Search cocktail by name" />}
              />
              {/* <Button sx={{ mt: 3 }} variant="contained">
                Search
              </Button> */}
            </FormControl>
          </div>
          <main>
            <div className="Main">
              <Routes>
                <Route path="/" element={<List />} />
                <Route path="/Cocktail/(:cocktailId)-:cocktailName" element={<Item />} />
                <Route path="/Ingredients/:ingredientName" element={<List />} />
              </Routes>
            </div>
          </main>
        </Container>
      </div>
      {/* <AppBar position="static" sx={{ mt: 3 }} elevation={0} component="footer" color="default">
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="caption">©{new Date().getFullYear()}</Typography>
        </Toolbar>
      </AppBar> */}
    </ThemeProvider>
  );
}

export default App;
