import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { InputAdornment, Paper, Toolbar } from "@material-ui/core";
import PageHeader from "components/PageHeader/PageHeader";
import Controls from "components/Controls";
// Icons
import ExtensionIcon from "@material-ui/icons/Extension";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
// core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle";
import BlockAPI from "../../api";
import { format, parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  ...styles,
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(2),
  },
  tableToolbar: {
    justifyContent: "space-between",
  },
  searchInput: {
    width: "25rem",
  },
  AddButton: {
    position: "relative",
    float: "right",
  },
}));

const columns = [
  {
    field: "name",
    headerName: "Article",
    // width: 280,
    disableClickEventBubbling: true,
    flex: 0.3,
  },
  {
    field: "description",
    headerName: "Description",
    // width: 550,
    disableClickEventBubbling: true,
    flex: 1,
  },
  {
    field: "inComponents",
    headerName: "Used",
    type: "number",
    disableClickEventBubbling: true,
    valueGetter: (params) => (params.row.components.length),
    flex: 0.15,
  },
    
  {
    field: "price",
    headerName: "Price",
    type: "number",
    // width: 200,
    disableClickEventBubbling: true,
    flex: 0.15,
  },
  {
    field: "pricetype",
    headerName: "Pricetype",
    type: "number",
    // width: 120,
    disableClickEventBubbling: true,
    flex: 0.2,
  },
  {
    field: "updatedAt",
    headerName: "Last update",
    type: "number",
    disableClickEventBubbling: true,
    flex: 0.18,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   disableClickEventBubbling: true,
  //   valueGetter: (params) =>
  //     `${params.getValue("firstName") || ""} ${
  //       params.getValue("lastName") || ""
  //     }`,
  // },
];

export default function TableList() {
  const classes = useStyles();
  const [dataLoading, setDataLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    try {
      setDataLoading(true)
      const response = await BlockAPI.get("/articles");
      const rows = response.data.data.map((rec) => ({
        ...rec,
        pricetype: rec.pricetype.name,
        price: rec.price + " €",
        updatedAt: format(parseISO(rec.updatedAt), "dd.MM.yyyy"),
      }));
      setRecords(rows);
      setDataLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper className={classes.pageContent}>
          <PageHeader
            title="Articles"
            subtitle="Articles are purchased or manufactured parts."
            icon={<ExtensionIcon style={{ fontSize: 56 }} />}
          />
          <Toolbar disableGutters className={classes.tableToolbar}>
            <Controls.Input
              className={classes.searchInput}
              // onChange={handleTableSearch}
              label="Search .."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Controls.Button
              text="Add New"
              onClick={() => {
                // setOpenPopup(true);
                // setSelectedRecord(null);
              }}
              startIcon={<AddIcon />}
            />
          </Toolbar>

          <DataGrid
            loading={dataLoading}
            autoHeight
            rows={records}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </Paper>
      </GridItem>
    </GridContainer>
  );
}
