import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";

export default function Checkbox(props) {
  const { label, name, checked, onChange, color } = props;

  const convertToDefEventPar = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox
            color={color}
            checked={checked}
            onChange={(e) =>
              onChange(convertToDefEventPar(name, e.target.checked))
            }
            name={name}
          />
        }
      />
    </FormControl>
  );
}
