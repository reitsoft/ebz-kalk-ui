import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "../../components/Controls";
import { useForm, Form } from "../../components/UseForm/UseForm";

const initialValues = {
  id: 0,
  name: "",
  description: "",
  // compInside: "",
  // city: "",
  // gender: "",
  // departmentId: "",
  // hireDate: new Date(),
  // isPermanent: false,
};

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

// const departments = [
//   { id: "1", title: "Marketing" },
//   { id: "2", title: "Sales" },
//   { id: "3", title: "Accounting" },
// ];

const BlocksForm = (props) => {
  const { addOrEdit, selectedRecord } = props;
  // eslint-disable-next-line
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialValues);

  const validate = () => {
    let validation = {};
    validation.name = values.name ? "" : "This field is required.";
    // validation.description = /$^|.+@.+..+/.test(values.description)
    //   ? ""
    //   : "Must be a valid description or empty.";
    // validation.compInside =
    //   values.compInside.length > 7 ? "" : "Please enter a valid phone number.";
    // validation.departmentId =
    //   values.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({ ...validation });
    return Object.values(validation).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (selectedRecord !== null) setValues({ ...selectedRecord });
    // eslint-disable-next-line
  }, [selectedRecord]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Controls.Input
            name="name"
            label="Block"
            value={values.name}
            onChange={handleInputChange}
            errorText={errors.name}
          />
          <Controls.Input
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
            errorText={errors.description}
          />
          <div style={{display: "flex", justifyContent: "flex-end", marginTop: 10}}>
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
            <Controls.Button text="Submit" type="submit" />
          </div>
          {/* <Controls.Input
            name="compInside"
            label="compInside"
            value={values.compInside}
            onChange={handleInputChange}
            errorText={errors.compInside}
          />
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
          /> */}
        </Grid>
        {/* <Grid item md={6} xs={12}> */}
        {/* <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={departments}
            errorText={errors.departmentId}
          />
          <Controls.Datepicker
            name="hireDate"
            label="Hire date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Checkbox
            color="primary"
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}

        {/* </Grid> */}
      </Grid>
    </Form>
  );
};

export default BlocksForm;
