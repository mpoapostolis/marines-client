import React, { useContext, forwardRef } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import I18n from "../../I18n";
import {
  Theme,
  colors,
  ListItemText,
  ListItemIcon,
  Typography,
  CssBaseline,
  Box,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TimelineIcon from "@material-ui/icons/Timeline";
import Profile from "./Profiles";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import AuthWrapper from "../AuthWrapper";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: "220px",
    border: "none",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRight: "solid 1px #eeeeee",
  },
  listItem: {
    padding: theme.spacing(1, 2),
    color: `${theme.palette.text.disabled}`,
  },

  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    color: "#546E7A",
    marginRight: theme.spacing(1),
  },
  divider: {},

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.primary.dark,
    border: "none",
    ...theme.mixins.toolbar,
  },

  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    background: "#38578b15",
    flexGrow: 1,
    "& .icon": {
      color: `${theme.palette.primary.main}`,
    },
    "& .typography": {
      color: `${theme.palette.primary.main}`,
    },
  },
}));

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
));

type Props = {
  open: boolean;
  setOpen: () => void;
  isSmallDevice: boolean;
};

function Menu(props: Props) {
  const t = useContext(I18n);
  const pages = [
    {
      title: t("int.dashboard"),
      href: "/",
      icon: <DashboardIcon className="icon" fontSize="small" />,
      exact: true,
      perm: [],
    },
    {
      title: t("int.spots"),
      href: "/spots",
      icon: <LocalParkingIcon className="icon" fontSize="small" />,
      perm: ["view:spots", "edit:spots"],
    },

    {
      title: t("int.marines"),
      href: "/marines",
      icon: <DirectionsBoatIcon className="icon" fontSize="small" />,
      perm: ["view:marines", "edit:marines"],
    },

    {
      title: t("int.history"),
      href: "/history",
      icon: <TimelineIcon className="icon" fontSize="small" />,
      perm: ["view:history", "edit:history"],
    },
  ];
  const classes = useStyles();
  return (
    <Drawer
      classes={{ paper: classes.drawer }}
      onClose={() => props.setOpen()}
      variant={props.isSmallDevice ? "temporary" : "persistent"}
      open={props.open}
    >
      <CssBaseline />
      <Box className={classes.toolbar} />

      <Divider className={classes.divider} />
      <div className={classes.root}>
        <Profile />
        <Divider className={classes.divider} />

        <List>
          {pages.map((page) => (
            <AuthWrapper redirect key={page.title} reqPerm={page.perm}>
              <ListItem
                button
                className={classes.listItem}
                exact={page.exact}
                component={CustomRouterLink}
                activeClassName={classes.active}
                to={page.href}
                disableGutters
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      className="typography"
                      color="textSecondary"
                      variant="h6"
                    >
                      {page.title}
                    </Typography>
                  }
                />
              </ListItem>
            </AuthWrapper>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
export default Menu;
