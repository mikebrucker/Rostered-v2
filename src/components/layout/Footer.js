import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { FaHockeyPuck } from "react-icons/fa";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    padding: theme.spacing.unit * 2
  },
  footerTitle: {
    fontSize: "1.2em",
    fontFamily: "Righteous, sans-serif",
    cursor: "pointer",

    "&:hover": {
      color: "antiquewhite"
    }
  },
  icons: {
    margin: "0 5px",
    verticalAlign: "-10%"
  }
});

const scrollToTopOfPage = () => {
  document.getElementById("root").scrollIntoView({
    behavior: "smooth"
  });
};

const Footer = ({ classes }) => {
  return (
    <footer className="Footer">
      <AppBar className={classes.root} position="static" color="primary">
        <Typography color="secondary" variant="h5">
          <div className={classes.footerTitle} onClick={scrollToTopOfPage}>
            &copy; {new Date().getFullYear()}{" "}
            <FaHockeyPuck className={classes.icons} /> Rostered
          </div>
        </Typography>
      </AppBar>
    </footer>
  );
};

export default withStyles(styles)(Footer);
