import React, { useEffect, useState } from "react";
import { hist } from "../../index";
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
import WidgetsIcon from "@material-ui/icons/Widgets";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
// components
import Button from "components/CustomButtons/Button";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import useTable from "../../components/UseTable/UseTable";
import PageHeader from "../../components/PageHeader/PageHeader";
import Controls from "../../components/Controls";
import BlocksForm from "./BlocksForm";
// API
import BlockAPI from "../../api";
// Styles
import { format, parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({

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

const headCells = [
  { id: "name", label: "Block" },
  { id: "description", label: "Description" },
  { id: "compIside", label: "Components inside" },
  { id: "updatedAt", label: "Last update" },
  { id: "actions", label: "Actions", disableSorting: true },
];

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
    // eslint-disable-line
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
      fn: (records) => {
        if (val === "") return records;
        else return records.filter((x) => x.name.toLowerCase().includes(val));
      },
    });
  };

  const openInPopup = (rec) => {
    setSelectedRecord(rec);
    setOpenPopup(true);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper className={classes.pageContent}>
          <PageHeader
            title="Blocks"
            subtitle="Blocks contain components that fit together thematically."
            icon={<WidgetsIcon style={{ fontSize: 56 }} />}
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
            <Button
              color="primary"
              onClick={() => {
                setOpenPopup(true);
                setSelectedRecord(null);
              }}
            >
              <AddIcon />
              Add new block
            </Button>
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recAfterPagindSorting().map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>{rec.name}</TableCell>
                  <TableCell>{rec.description}</TableCell>
                  <TableCell>{rec.components.length}</TableCell>
                  <TableCell>
                    {format(parseISO(rec.updatedAt), "dd.MM.yyyy")}
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="success"
                      type="content"
                      onClick={() => hist.push(`/admin/blocksdetail/${rec.id}`)}
                    />
                    <Controls.ActionButton
                      color="primary"
                      type="edit"
                      onClick={() => openInPopup(rec)}
                    />
                    <Controls.ActionButton
                      color="secondary"
                      type="delete"
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
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
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
      </GridItem>
    </GridContainer>
  );
}
