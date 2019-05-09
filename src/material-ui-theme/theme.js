import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const secondaryColor = grey[900];
const deepOrange50 = deepOrange[50];
const deepOrange100 = deepOrange[100];
const grey200 = grey[200];
const grey300 = grey[300];

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: deepOrange,
    secondary: { main: secondaryColor },
    error: red,
    background: {
      schedule: grey200,
      schedule2: grey300,
      player: deepOrange50,
      player2: deepOrange100,
      game: deepOrange50
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

export default theme;
