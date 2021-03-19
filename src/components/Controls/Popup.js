import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ActionButton from "./ActionButton";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(10),
  },
  title: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: 0,
  },
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .MuiFormControl-root": {
    width: "100%",
  },
}));

export default function Popup(props) {
  const classes = useStyles();
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.title}>
        <div style={{ display: "flex" }}>
          <Typography
            variant="h5"
            component="div"
            style={{ flexGrow: 1, marginTop: 8 }}
          >
            {title}
          </Typography>
          <ActionButton type="close" onClick={() => setOpenPopup(false)} />
        </div>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
