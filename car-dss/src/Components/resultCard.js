import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Test1
      </Typography>
      <Typography variant="h5" component="div">
        Test2
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Test3
      </Typography>
      <Typography variant="body2">
        Test4
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions style={{textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button size="small" variant='contained' style={{textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center'}}>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}