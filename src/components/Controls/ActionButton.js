import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import HelpIcon from '@material-ui/icons/Help';
import Edit from "@material-ui/icons/Edit";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Close from "@material-ui/icons/Close";

import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function ActionButton(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const { color, children, variant, onClick, type, ...other } = props;

  function IconType (){
    switch(type) {
      case "content": {
        return <DeviceHubIcon className={classes.tableActionButtonIcon + " " + classes.content} />
      }
      case "edit": {
        return <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
      }
      case "copy": {
        return <FileCopyIcon className={classes.tableActionButtonIcon + " " + classes.copy} />
      }
      case "close": {
        return <Close className={classes.tableActionButtonIcon + " " + classes.close} />
      }
      default: {
        return <HelpIcon className={classes.tableActionButtonIcon + " " + classes.close} />
      }
    }
  
  //   if (type==="content") {
  //      return <DeviceHubIcon className={classes.tableActionButtonIcon + " " + classes.content} />
  //   } else if (type==="edit"){
  //     return <Edit className={classes.tableActionButtonIcon + " " + classes.edit} />
  //   } else {
  //      return <Close className={classes.tableActionButtonIcon + " " + classes.close} />
  //   }
  }


  return (

    <IconButton onClick={onClick} className={classes.tableActionButton}>
      {IconType()}
    </IconButton>
  );
}
