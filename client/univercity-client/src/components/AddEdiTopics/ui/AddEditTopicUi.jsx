import {makeStyles} from "tss-react/mui";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles()({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        margin: '16px',
        flexBasis: "80vw",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
    addButtonContainer: {
        marginTop: "1%",
        width: "15%",
    },
    addButton: {
        marginTop: '16px',
        backgroundColor: '#0000FF',
        color: '#ffffff',
    },
    listContainer: {
        position: "relative",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
    },
    list: {
        height: "40vh",
        overflowY: "scroll",
        width: "80%",
        backgroundColor: '#EFE5D5',
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver",
            borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        },
    },
    listItemContainer: {
        "&:hover": {
            backgroundColor: "antiquewhite",
        },
    },
    rightSideBarContainer: {
        display: "flex",
        flexDirection: "column",
        width: "150px"
    },
    elementCountInput: {
        width: "25%",
        display: "block"
    },
    elementCountLabel: {
        fontSize: "12px"
    }
});

const AddEditTopicsUi = ({
                             topics,
                             handleEdit,
                             handleRemove,
                             pageCount,
                             selectedPageIndex,
                             handlePageChange,
                             handleAdd,
                             isAddDialogOpen,
                             handleCloseDialog,
                             editIndex,
                             newItem,
                             setNewItem,
                             handleSave,
                             setElementsPerPageCount,
                             pageElementCount
                         }) => {
    const {classes} = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={`${classes.listContainer} ${classes.list}`}>
                    <List>
                        {topics.map((item, index) => (
                            <ListItem
                                key={index}
                                className={classes.listItemContainer}
                            >
                                <ListItemText primary={item.title}/>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        title="Edit"
                                        onClick={() => handleEdit(index)}
                                        edge="end"
                                        aria-label="edit"
                                    >
                                        <Edit style={{fontSize: "16px"}}/>
                                    </IconButton>
                                    <IconButton
                                        title="Delete"
                                        onClick={() => handleRemove(index)}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <Delete style={{fontSize: "16px"}}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                {pageCount > 1 &&
                    <Stack spacing={2}>
                        <Pagination count={pageCount} page={selectedPageIndex.index + 1} onChange={handlePageChange}/>
                    </Stack>
                }
                <div className={classes.addButtonContainer}>
                    <Button
                        className={classes.addButton}
                        variant="contained"
                        startIcon={<Add/>}
                        onClick={handleAdd}
                    >
                        Add New
                    </Button>
                </div>

                <Dialog
                    open={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    maxWidth="l"
                    fullWidth
                    PaperProps={{
                        style: {
                            maxHeight: "calc(100% - 64px * 2)",
                            height: "calc(100% - 64px * 4)",
                            width: "calc(100% - 64px * 8)"
                        },
                    }}
                >
                    <DialogTitle>
                        {editIndex !== null ? "Edit Topic" : "Add New Topic"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Topic"
                            type="text"
                            fullWidth
                            value={newItem.title || ""}
                            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (newItem.title && topics.map(t => t.title).indexOf(newItem.title) === -1) {
                                        handleSave();
                                    }
                                }
                            }}
                            inputProps={{maxLength: 255}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleSave}
                            color="primary"
                            disabled={!newItem.title || topics.map(t => t.title).indexOf(newItem.title) !== -1}
                        >
                            {editIndex !== null ? "Update" : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={classes.rightSideBarContainer}>
                <div>
                    <label className={classes.elementCountLabel}>{"Elements per page"}</label>
                    <input
                        className={classes.elementCountInput}
                        type="text"
                        value={(pageElementCount && pageElementCount > 0) ? pageElementCount : 10}
                        onChange={e => {
                            setElementsPerPageCount(e.target.value);
                        }}
                        maxLength={2}
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                </div>
            </div>
        </div>
    );
};
export default AddEditTopicsUi;
