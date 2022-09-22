import * as React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function List({}) {
  const [itemsResults, setItemsResults] = useState();
  const { ingredientName } = useParams();

  //get cocktails by ingredient
  const getItemsResults = async item => {
    const response = await axios.get(
      ingredientName
        ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
    );
    if (response.data.drinks) {
      // console.log(response.data.drinks);
      setItemsResults(response.data.drinks);
    }
  };

  //first render
  useEffect(() => {
    getItemsResults();
  }, []);
  return (
    <div>
      {/* <Paper sx={{ p: 3, mt: 3 }} elevation={2}> */}
      <Typography variant="h3" align="center" color="TextSecondary" gutterBottom>
        {ingredientName ? `Cocktails with ${ingredientName}` : ""}
      </Typography>
      <Grid container spacing={2}>
        {itemsResults
          ? itemsResults.map(item => (
              <Grid item xs={6} md={4} lg={3} sx={{ p: 0 }}>
                <Link underline="none" component={RouterLink} to={`/Cocktail/(${item.idDrink})-${item.strDrink}`}>
                  <Paper
                    sx={{
                      p: 1,
                      m: 0,
                      backgroundColor: "#fafafa",
                      maxWidth: "200px",
                      "&:hover": {
                        color: "black",
                        backgroundColor: "lightgray"
                      }
                    }}
                    variant="outlined"
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100
                      }}
                      alt={item.strDrink}
                      src={item.strDrinkThumb}
                    />
                    <Typography variant="h6" sx={{ p: 0, m: 0 }} align="center" color="TextSecondary" gutterBottom>
                      {item.strDrink}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))
          : ""}
      </Grid>
      {/* </Paper> */}
    </div>
  );
}
