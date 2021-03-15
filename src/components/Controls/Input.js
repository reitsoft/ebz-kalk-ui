import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Input(props) {
  const { name, label, value, errorText = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      size="small"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...other}
      {...(errorText && { error: true, helperText: errorText })}
    />
  );
}
