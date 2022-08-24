

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Settings from '../../settings';

export default function CardComponent({product}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Settings.assetUrl+product.productId}
          alt={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}