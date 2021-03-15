import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

export default function Notification(props) {
  const classes = useStyles();
  const { notify, setNotify } = props;

  const handleClose = (e, reason) => {
    setNotify({ ...notify, isOpen: false });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      className={classes.root}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
