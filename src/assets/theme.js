
import { createTheme } from '@mui/material/styles';
import COLORS from './colors1';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primaryPurple,
    },
    secondary: {
      main: COLORS.secondarySeafoam,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
});

export default theme;
