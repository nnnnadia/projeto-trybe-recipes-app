import { Typography, styled, ToggleButtonGroup } from '@mui/material';

export const HeaderTitle = styled(Typography)`
  font-family: monospace;
  font-weight: 700;
  letter-spacing: .3rem;
  text-transform: uppercase;
`;

export const FixedFooter = styled('footer')`
  bottom: 0;
  position: fixed;
  text-align: center;
  width: 100%;
`;

export const ToggleButtonGroupPadded = styled(ToggleButtonGroup)`
  padding: 10px;
`;

export const AppTitle = styled(Typography)`
  font-family: 'Spline Sans Mono', monospace;
`;
