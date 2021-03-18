import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import WidgetsIcon from "@material-ui/icons/Widgets";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PageHeader from "components/PageHeader/PageHeader";
import useTable from "components/UseTable/UseTable";
import { format, parseISO } from "date-fns";

// API
import BlockAPI from "../../api";
import Controls from "components/Controls";
import Button from "components/CustomButtons/Button";

const useStyles = makeStyles((theme) => ({
  // ...styles,
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
  { id: "name", label: "Component" },
  { id: "description", label: "Description" },
  { id: "updatedAt", label: "Last update" },
  { id: "actions", label: "", disableSorting: true },
];

const BlocksDetail = (props) => {
  const { id } = useParams();
  const classes = useStyles();
  const [block, setBlock] = useState([]);
  const [components, setComponents] = useState([]);
  // const [openPopup, setOpenPopup] = useState(false);
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

  const {
    TblContainer,
    TblHead,
    recAfterPagindSorting,
  } = useTable(components, headCells, filterFn);

  const fetchData = async () => {
    try {
      const response = await BlockAPI.get(`/blocks/${id}`);
      setBlock(response.data.data);
      setComponents(response.data.data.components);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleTableSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setFilterFn({
      fn: (records) => {
        if (val === "") return records;
        else return records.filter((x) => x.name.toLowerCase().includes(val));
      },
    });
  };

  const handleDelete = async (comp_id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    try {
      console.log({block_id: id, co_id: comp_id})
      await BlockAPI.delete(`/blocks/${id}/deleteComponent`, {
        data: {component_id: comp_id}
      });
      fetchData();
      setNotify({
        isOpen: true,
        message: "Komponente entfernt!",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Fehler beim entfernen!",
        type: "error",
      });
    }
   
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Paper className={classes.pageContent}>
          <PageHeader
            title={block.name}
            subtitle={block.description}
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
            <Button color="primary"onClick={() => {
                // setOpenPopup(true);
                // setSelectedRecord(null);
              }}><AddIcon />Add Component</Button>
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recAfterPagindSorting().map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell>{comp.name}</TableCell>
                  <TableCell>{comp.description}</TableCell>
                  <TableCell>
                    {format(parseISO(comp.updatedAt), "dd.MM.yyyy")}
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      type="delete"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Sind Sie sich sicher?",
                          subtitle: "Komponente wird aus dem Block entfernt.",
                          onConfirm: () => {
                            handleDelete(comp.id);
                          },
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        </Paper>
      {/* <Controls.Popup
          title={selectedRecord ? "Edit Block" : "Add new Block"}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <BlocksForm addOrEdit={addOrEdit} selectedRecord={selectedRecord} />
        </Controls.Popup> */}
        <Controls.Notification notify={notify} setNotify={setNotify} />
        <Controls.ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </GridItem>
    </GridContainer>
  );
};

export default BlocksDetail;
