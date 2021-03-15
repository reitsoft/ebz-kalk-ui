import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/de";

export default function Datepicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPar = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
      <KeyboardDatePicker
        disableToolbar
        size="small"
        variant="inline"
        inputVariant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={date =>onChange(convertToDefEventPar(name, date))}
        format="dd.MM.yyyy"
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
}
