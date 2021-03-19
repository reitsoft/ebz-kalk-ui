import React, { useState, useEffect } from "react";
import { hist } from "../../index";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { InputAdornment, Paper, Toolbar } from "@material-ui/core";
import PageHeader from "components/PageHeader/PageHeader";
import Controls from "components/Controls";
import Button from "components/CustomButtons/Button";
// Icons
import ExtensionIcon from "@material-ui/icons/Extension";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

import BlockAPI from "../../api";
import { format, parseISO } from "date-fns";
import ArticlesForm from "./ArticlesForm";

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

export default function TableList() {
  const classes = useStyles();
  const [dataLoading, setDataLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [action, setAction] = useState("")
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

  const actions = {edit:"edit", copy:"copy"}

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
      valueGetter: (params) => params.row.components.length,
      flex: 0.15,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      // width: 200,
      disableClickEventBubbling: true,
      flex: 0.2,
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
      headerName: "Updated at",
      type: "number",
      disableClickEventBubbling: true,
      flex: 0.22,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      disableClickEventBubbling: true,
      flex: 0.28,
      renderCell: ({ row }) => <ActionButtons rec={row} />,
    },
  ];

  const fetchData = async () => {
    try {
      setDataLoading(true);
      const response = await BlockAPI.get("/articles");
      const rows = response.data.data.map((rec) => ({
        ...rec,
        pricetype: rec.pricetype.name,
        price: rec.price + " €",
        updatedAt: format(parseISO(rec.updatedAt), "dd.MM.yyyy"),
      }));
      setRecords(rows);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrEdit = async (rec, resetForm, action ) => {
    const newRec = {
      id: rec.id,
      name: rec.name,
      description: rec.description,
      pricetype_id: rec.pricetype_id,
      price: rec.price.split(" ")[0],
    };
  
    if (newRec.id === 0 || action==="copy") {
      try {
        await BlockAPI.post("/articles", newRec);
        resetForm();
        setNotify({
          isOpen: true,
          message: "Neuen Artikel eingefügt!",
          type: "success",
        });
        setSelectedRecord(null);
        setOpenPopup(false);
        setAction("")
        fetchData();
      } catch (err) {
        console.log(err);
        setNotify({
          isOpen: true,
          message: "Fehler beim speichern des Artikels!",
          type: "error",
        });
      }
    } else {
      try {
        await BlockAPI.put(`/articles/${rec.id}`, newRec);
        resetForm();
        setNotify({
          isOpen: true,
          message: "Artikel bearbeitet!",
          type: "success",
        });
        setSelectedRecord(null);
        setOpenPopup(false);
        fetchData();
      } catch (error) {
        console.log(error);
        setNotify({
          isOpen: true,
          message: "Fehler beim bearbeiten des Artikels!",
          type: "error",
        });
      }
    }
  };

  const handleDelete = async (rec) => {
    const id = rec.rec.id;
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      await BlockAPI.delete(`/articles/${id}`);
      fetchData();
      setNotify({
        isOpen: true,
        message: "Erfolgreich gelöscht!",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Fehler beim löschen des Artikels!",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const openInPopup = (rec, action) => {
    // console.log(rec.rec);
    setSelectedRecord(rec.rec);
    setAction(action);
    setOpenPopup(true);
  };

  const ActionButtons = (rec) => {
    return (
      <>
        <Controls.ActionButton
          color="success"
          type="content"
          onClick={() => hist.push(`/admin/blocksdetail/${rec.rec.id}`)}
        />
        <Controls.ActionButton
          color="warning"
          type="copy"
          onClick={() => openInPopup(rec, actions.copy)}
        />
        <Controls.ActionButton
          color="primary"
          type="edit"
          onClick={() => openInPopup(rec, actions.edit)}
        />
        <Controls.ActionButton
          color="secondary"
          type="close"
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Sind Sie sich sicher?",
              subtitle: "Datensatz wird unwiederuflich gelöscht.",
              onConfirm: () => {
                handleDelete(rec);
              },
            });
          }}
        />
      </>
    );
  };

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
            <Button
              color="primary"
              onClick={() => {
                setOpenPopup(true);
                setSelectedRecord(null);
              }}
            >
              <AddIcon />
              Add new Article
            </Button>
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
      <Controls.Popup
        title={selectedRecord ? action === actions.copy ? "Copy article" : "Edit Article" : "Add new Article"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ArticlesForm addOrEdit={addOrEdit} selectedRecord={selectedRecord} action={action} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </GridContainer>
  );
}
