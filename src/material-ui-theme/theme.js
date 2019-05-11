import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

// const primaryColor =
//   profile && profile.themeColor ? profile.themeColor : deepOrange;

const theme = {
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: deepOrange,
    secondary: { ...grey, main: grey[900] },
    error: red,

    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
};

// export default firestoreConnect(props => {
//   return [{ collection: "users", doc: props.auth.uid }];
// })(theme);
export default theme;
