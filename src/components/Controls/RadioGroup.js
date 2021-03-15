import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const RadioGroup = (props) => {
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <MuiRadioGroup
        row
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
