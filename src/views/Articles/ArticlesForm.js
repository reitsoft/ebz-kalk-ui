import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "../../components/Controls";
import Button from "components/CustomButtons/Button";
import { useForm, Form } from "../../components/UseForm/UseForm";
import BlockAPI from "../../api";

const initialValues = {
  id: 0,
  name: "",
  description: "",
  pricetype_id: "",
  price: "",
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

const ArticlesForm = (props) => {
  const { addOrEdit, selectedRecord, action } = props;
  const [pricetypes, setPricetypes] = useState([]);

  const fetchPricetypes = async () => {
    try {
      const response = await BlockAPI.get("/pricetypes");
      const mappedPricetypes = response.data.data.map((x) => ({
        id: x.id,
        title: x.name,
        decription: x.description,
      }));
      setPricetypes(mappedPricetypes);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = async () => {
    let validation = {};
    validation.name = values.name ? "" : "This field is required.";

    await BlockAPI.get(`/articles/isunique/${values.name}`)
      .then((res) => {
        if (res.data) {
          validation.name = "This name already exists.";
        }
      })
      .catch((err) => {
        console.log(err);
      });

    validation.pricetype_id = values.pricetype_id
      ? ""
      : "This field is required.";
    validation.price = values.price ? "" : "This field is required.";
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

  useEffect(() => {
    fetchPricetypes();
    if (selectedRecord !== null) setValues({ ...selectedRecord });
    // eslint-disable-next-line
  }, [selectedRecord]);

  // eslint-disable-next-line
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm, action);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Controls.Input
            name="name"
            label="Article name"
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
        </Grid>
        </Grid>
        <Grid container>
        <Grid item md={6} xs={12}>
          <Controls.Select
            name="pricetype_id"
            label="Pricetype"
            value={values.pricetype_id}
            onChange={handleInputChange}
            options={pricetypes}
            errorText={errors.pricetype_id}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controls.Input
            name="price"
            label="Price"
            value={values.price}
            onChange={handleInputChange}
            errorText={errors.price}
          />
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Button color="gray" onClick={resetForm}>
            Reset
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ArticlesForm;
