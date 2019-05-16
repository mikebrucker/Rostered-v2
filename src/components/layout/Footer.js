import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { FaHockeyPuck } from "react-icons/fa";
import { GiHockey, GiJasonMask } from "react-icons/gi";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 2
  },
  footerTitle: {
    fontFamily: "Righteous, sans-serif",
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.background.paper
    }
  },
  icons: {
    margin: "0 5px",
    verticalAlign: "-10%"
  },
  icon: {
    fontSize: "3em"
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
        <Typography
          className={classes.footerTitle}
          onClick={scrollToTopOfPage}
          color="secondary"
          variant="h5"
        >
          &copy; {new Date().getFullYear()}{" "}
          <FaHockeyPuck className={classes.icons} /> Rostered
          <div className={classes.icon}>
            <GiHockey />
            <GiJasonMask />
          </div>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created by Mike Brucker&nbsp;
        </Typography>
      </AppBar>
    </footer>
  );
};

export default withStyles(styles)(Footer);
