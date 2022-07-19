import { Typography, styled, Grid, Card } from '@mui/material';

export const HeaderTitle = styled(Typography)`
  font-family: monospace;
  font-weight: 700;
  letter-spacing: .3rem;
  text-transform: uppercase;
`;

export const CategoriesOptionsGrid = styled(Grid)`
  margin: 5px auto;
`;

export const CardWithMargin = styled(Card)`
  margin-bottom: 10px;
`;
