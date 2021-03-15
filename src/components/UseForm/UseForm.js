import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(`${name}: ${value}`);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
