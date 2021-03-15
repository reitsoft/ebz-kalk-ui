import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NotListedLocation } from "@material-ui/icons";
import React from "react";
import Button from "./Button";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing.toString(2),
    paddingBottom: theme.spacing(3),
    position:"absolute",
    top: theme.spacing(5)
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogContent: {
    textAlign: "center"
  },
  dialogActions: {
    justifyContent: "center"
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem"
    }
  }
}));

export default function ConfirmDialog(props) {
  const classes = useStyles()
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}><NotListedLocation/></IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          text="No"
          size="small"
          color="default"
          variant="contained"
          onClick={() => setConfirmDialog({...confirmDialog, isOpen:false})}
        />
        <Button
          text="Yes"
          size="small"
          color="secondary"
          variant="contained"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
