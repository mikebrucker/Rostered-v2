import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";

import grey from "@material-ui/core/colors/grey";

export const theme = {
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

export const themeColors = [
  { value: deepOrange, label: "Deep Orange" },
  { value: red, label: "Red" },
  { value: pink, label: "Pink" },
  { value: purple, label: "Purple" },
  { value: deepPurple, label: "Deep Purple" },
  { value: indigo, label: "Indigo" },
  { value: blue, label: "Blue" },
  { value: lightBlue, label: "Light Blue" },
  { value: cyan, label: "Cyan" },
  { value: teal, label: "Teal" },
  { value: green, label: "Green" },
  { value: lightGreen, label: "Light Green" },
  { value: lime, label: "Lime" },
  { value: yellow, label: "Yellow" },
  { value: amber, label: "Amber" },
  { value: orange, label: "Orange" }
];
