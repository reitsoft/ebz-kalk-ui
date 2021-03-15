import React, { useEffect, useState } from "react";
// @material-ui/core
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
import useTable from "../../components/UseTable/UseTable";
import PageHeader from "../../components/PageHeader/PageHeader";
import Controls from "../../components/Controls";
import BlocksForm from "./BlocksForm";

// API
import BlockAPI from "../../api";

const useStyles = makeStyles(theme=>({
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
  }))

const headCells = [
  { id: "name", label: "Block" },
  { id: "description", label: "Description" },
  { id: "compIside", label: "Components included" },
  { id: "actions", label: "Actions", disableSorting: true },
];

// const useStyles = makeStyles(styles);

export default function Blocks() {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const fetchData = async () => {
    try {
      const response = await BlockAPI.get("/blocks");
      setRecords(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const addOrEdit = async (rec, resetForm) => {
    if (rec.id === 0) {
      try {
        await BlockAPI.post("/blocks", {
          name: rec.name,
          description: rec.description,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await BlockAPI.put(`/blocks/${rec.id}`, {
          name: rec.name,
          description: rec.description,
        });
      } catch (error) {
        console.log(error);
      }
    }
    resetForm();
    setSelectedRecord(null);
    setOpenPopup(false);
    fetchData();
    setNotify({
      isOpen: true,
      message: "Erfolgreich eingefügt!",
      type: "success",
    });
  };

  const handleDelete = async (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      await BlockAPI.delete(`/blocks/${id}`);
      // setRecords(
      //   records.filter((rec) => {
      //     return rec.id !== id;
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
    fetchData();
    setNotify({
      isOpen: true,
      message: "Erfolgreich gelöscht!",
      type: "error",
    });
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recAfterPagindSorting,
  } = useTable(records, headCells, filterFn);

  const handleTableSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setFilterFn({
      fn: (items) => {
        if (e.target.value === "") return items;
        else return items.filter((x) => x.name.toLowerCase().includes(val));
      },
    });
  };

  const openInPopup = (rec) => {
    setSelectedRecord(rec);
    setOpenPopup(true);
  };

  return (
    <>
      {/* <GridContainer> */}
      
      <Paper className={classes.pageContent}>
      <PageHeader
        title="Blocks"
        subtitle="Blocks contain components that fit together thematically."
        icon={<DashboardIcon style={{ fontSize: 56 }} />}
      />
        <Toolbar disableGutters className={classes.tableToolbar}>
          <Controls.Input
            className={classes.searchInput}
            onChange={handleTableSearch}
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
              setOpenPopup(true);
              setSelectedRecord(null);
            }}
            startIcon={<AddIcon />}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recAfterPagindSorting().map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.name}</TableCell>
                <TableCell>{rec.description}</TableCell>
                <TableCell>{rec.compIside}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => openInPopup(rec)}
                  >
                    <EditIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Sind Sie sich sicher?",
                        subtitle: "Datensatz wird unwiederuflich gelöscht.",
                        onConfirm: () => {
                          handleDelete(rec.id);
                        },
                      });
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      {/* </GridContainer> */}
      <Controls.Popup
        title={selectedRecord ? "Edit Block" : "Add new Block"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <BlocksForm addOrEdit={addOrEdit} selectedRecord={selectedRecord} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
