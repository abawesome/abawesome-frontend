import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Logo from "./common/logo";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  },
  avatar: {
    margin: "auto 5px",
    float: "left",
    width: 20,
    height: 38
  },
  username: {
    fontWeight: "bold",
    height: 24
  },
  button: {
    float: "left"
  }
});

const NavBar = props => {
  const { classes, user } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Logo />
            {/*TODO:add missing logo styles*/}
          </Typography>
          <Button>Features</Button>
          <Button>Enterprise</Button>
          <Button>Support</Button>
          {!user && (
            <Button color="primary" variant="outlined">
              Login
            </Button>
          )}
          {user && (
            <span className={classes.username}>
              {user.username.toUpperCase()}
            </span>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
