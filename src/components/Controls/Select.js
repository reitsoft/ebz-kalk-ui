import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

export default function Select(props) {
  const { name, label, value, errorText = null, onChange, options } = props;
  return (
    <FormControl
      variant="outlined"
      size="small"
      {...(errorText && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
      
    </FormControl>
  );
}
