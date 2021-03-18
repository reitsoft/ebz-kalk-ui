import {
  grayColor, // eslint-disable-line
  primaryColor, // eslint-disable-line
  infoColor, // eslint-disable-line
  successColor, // eslint-disable-line
  warningColor, // eslint-disable-line
  dangerColor, // eslint-disable-line
  roseColor, // eslint-disable-line
  whiteColor, // eslint-disable-line
  blackColor, // eslint-disable-line
  hexToRgb, // eslint-disable-line
} from "assets/jss/material-dashboard-react.js";

const pageHeaderStyle = {
  root: {
    // backgroundColor: "#fbfbff",
  },
  pageHeader: {
    padding: 0,
    display: "flex",
    marginBotton: "8px",
  },
  pageIcon: {
    display: "inline-block",
    padding: "16px",
    paddingLeft: 0,
    paddingTop: "8px",
    color: primaryColor[0]
  },
  pageTitle: {
    paddingLeft: 0,
    paddingTop: "8px",
    "& MuiTypography-subtitle2": {
      opacity: "0.5",
      fontColor: "red",
    },
  },
  pageSubtitle: {
    opacity: "0.5",
  },
};

export default pageHeaderStyle;
