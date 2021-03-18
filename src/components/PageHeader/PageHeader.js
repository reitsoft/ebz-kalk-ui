import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/components/pageHeaderStyle";

const useStyles = makeStyles(styles);

const PageHeader = (props) => {
  const classes = useStyles();
  const { title, subtitle, icon } = props;
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        {/* <Card elevation={0} className={classes.pageIcon}>
          {icon}
        </Card> */}
        <div className={classes.pageIcon}>
        {icon}
        </div>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div"className={classes.pageSubtitle}>
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
