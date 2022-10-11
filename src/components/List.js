import * as React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function List() {
  const [itemsResults, setItemsResults] = useState();
  const { ingredientName } = useParams();

  //get cocktails by ingredient
  const getItemsResults = async (item) => {
    const response = await axios.get(
      ingredientName
        ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mar`
    );
    if (response.data.drinks) {
      //console.log(response.data.drinks);
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
      <Typography variant="h3" align="center" sx={{ m: 3 }} color="TextSecondary" gutterBottom>
        {ingredientName ? `Cocktails with ${ingredientName}` : ""}
      </Typography>
      <Grid container spacing={3}>
        {itemsResults
          ? itemsResults.slice(0, 8).map((item) => (
              <Grid key={item.idDrink} item xs={6} md={4} lg={3} sx={{ p: 0 }}>
                <Link underline="none" component={RouterLink} to={`/Cocktail/(${item.idDrink})-${item.strDrink}`}>
                  <Paper
                    className="card"
                    sx={{
                      p: 1,
                      m: 0,
                      borderRadius: "0 10px 0 0",
                      borderWidth: 0,
                      height: 270,
                      "&:hover": {
                        color: "black",
                        backgroundColor: "lightgray",
                      },
                    }}
                    variant="outlined"
                  >
                    <div className="imgOverlay"></div>
                    <div className="circle">
                      <Box
                        component="img"
                        sx={{
                          height: 118,
                          width: 118,
                          borderRadius: "50%",
                        }}
                        alt={item.strDrink}
                        src={item.strDrinkThumb}
                      />
                    </div>
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
