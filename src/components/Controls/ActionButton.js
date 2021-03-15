import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  // primary: {
  //   backgroundColor: theme.palette.primary.light,
  //   "& .MuiButton-label": {
  //     color: theme.palette.primary.main
  //   }
  // },
  // secondary: {
  //   backgroundColor: "#ffeeee",
  //   "& .MuiButton-label": {
  //     color: "#ff1744"
  //   },
  //   "& .MuiButton-root:hover": {
  //     backgroundColor: "#ffcccc"
  //   }
  // }
}));

export default function ActionButton(props) {
  const classes = useStyles()
  // eslint-disable-next-line
  const { color, children, variant, onClick, ...other } = props;
  return (
    <Button onClick={onClick} color={color} className={classes.root}>
      {children}
    </Button>
  );
}
