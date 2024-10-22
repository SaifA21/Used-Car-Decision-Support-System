import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline } from "@mui/material";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const savePurchase = async (item, searchID) => {
  console.log(item)
  const url = "/api/savePurchase";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: searchID, selectedCar: item })

  });
  const body = await response.json;

  if (response.status !== 200) throw Error(body.message);
  return body;
}

export default function OutlinedCard(prop) {

  return (
    <div>
      {prop.results.map((item, index) => (
        item != null && item !== "" && (
          <Box sx={{ minWidth: 275 }}>
            <br />
            <CardContent>
              <Card sx={{ outline: '3px solid #f0f0f0' }}>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  {item}
                </Typography>
                <CardActions style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!prop.purchased &&
                    <Button onClick={() => { savePurchase(item, prop.searchID); prop.setPurchased(true) }}
                      size="small" variant='contained' style={{
                        textAlign: 'center', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                      }}>I Purchased This Vehicle</Button>
                  }
                </CardActions>
              </Card>
            </CardContent>
          </Box>

        )))}
      {prop.purchased == true && (
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Thank you!
        </Typography>
      )}
    </div>
  );
}