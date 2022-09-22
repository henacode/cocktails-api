import * as React from "react";
import { Typography, Grid, Box, Paper } from "@mui/material";
import { Route, Routes, Link as RouterLink, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";

export default function Item() {
  const [itemData, setItemResults] = useState();
  const { cocktailId } = useParams();
  if (cocktailId === undefined) {
    return;
  }
  // console.log(cocktailId);
  //get item
  const getItemResult = async item => {
    if (cocktailId) {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
      if (response.data.drinks) {
        setItemResults(response.data.drinks[0]);
      }
    }
  };

  getItemResult();

  if (itemData) {
    const ingredients = [];

    Object.entries(itemData).forEach(([key, value]) => {
      if (key.startsWith("strIngredient") && value !== null) {
        const ingredientThumb = `https://www.thecocktaildb.com/images/ingredients/${value}-Medium.png`;
        ingredients.push({
          ingredientName: value,
          ingredientThumb: ingredientThumb
        });
      }
    });

    return (
      <div>
        <Typography variant="h3" sx={{ mt: 3 }} align="center" color="TextSecondary" gutterBottom>
          Cocktail {itemData.strDrink}
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6} sx={{ p: 3 }}>
              <Box
                component="img"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  width: 400
                }}
                alt={itemData.strDrink}
                src={itemData.strDrinkThumb}
              />
              <Typography variant="body1" align="left">
                {itemData.strInstructions}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: 3 }}>
              <Typography variant="h4" align="center" color="TextSecondary" gutterBottom>
                Ingredients
              </Typography>
              <Grid container spacing={2}>
                {ingredients.map(item => (
                  <Grid item xs={6} sx={{ p: 3 }}>
                    <Link component={RouterLink} to={`/Ingredients/${item.ingredientName}`}>
                      <Box
                        component="img"
                        sx={{
                          height: 100,
                          width: 100
                        }}
                        alt={item.ingredientName}
                        src={item.ingredientThumb}
                      />
                      <Typography variant="h6" align="center" color="TextSecondary" gutterBottom>
                        {item.ingredientName}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
