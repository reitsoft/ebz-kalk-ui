import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);
// const useStyles = makeStyles((theme) => ({
//   root: {
//     minWidth: 0,
//     margin: theme.spacing(0.5),
//   },
//   primary: {
//     backgroundColor: theme.palette.primary.light,
//     "& .MuiButton-label": {
//       color: theme.palette.primary.main
//     }
//   },
//   secondary: {
//     backgroundColor: "#ffeeee",
//     "& .MuiButton-label": {
//       color: "#ff1744"
//     },
//     "& .MuiButton-root:hover": {
//       backgroundColor: "#ffcccc"
//     }
//   }
// }));

export default function ActionButton(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const { color, children, variant, onClick, type, ...other } = props;
  return (
    // <Button onClick={onClick} color={color} className={classes.root}>
    //   {children}
    // </Button>
    <IconButton onClick={onClick} className={classes.tableActionButton}>
      {type === "edit" ? (
        <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
      ) : (
        <Close
          className={classes.tableActionButtonIcon + " " + classes.close}
        />
      )}
    </IconButton>
  );
}
