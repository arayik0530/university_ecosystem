import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    createTopic,
    deleteTopic,
    getExistingTopics,
    removeTopic,
    updateTopic,
} from "../../redux/actions/topic/topicActions";
import {
    Button,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {Add, Edit, Delete} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        margin: theme.spacing(2),
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
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
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
        backgroundColor: theme.palette.background.paper,
        "&::-webkit-scrollbar": {
            width: "8px", // Adjust the scrollbar width
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver",
            borderRadius: "5px", // Add border-radius to scrollbar thumb
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.paper,
        },
    },
    listItemContainer: {
        "&:hover": {
            backgroundColor: "antiquewhite", // Change the background color on hover
        },
    },
}));

const AddEditTopicsContainer = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(getExistingTopics());
    }, [dispatch]);
    const topics = useSelector((state) => state.topic.topics);
    console.log("topics are", topics);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState("");

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem(topics[index]);
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        dispatch(removeTopic(topics[index]));
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem("");
        setAddDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setAddDialogOpen(false);
    };

    const handleSave = () => {
        console.log('newItem is: ', newItem);
        console.log('oldItem is: ', topics[editIndex]);
        if (editIndex) {
            if(newItem.title !== topics[editIndex].title) {
                dispatch(updateTopic({...topics[editIndex], title: newItem}));
            }
        } else {
            dispatch(createTopic({title: newItem}));
        }
        setEditIndex(null);
        setNewItem("");
        setAddDialogOpen(false);
    };

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

                {/* Add Item Dialog */}
                <Dialog open={isAddDialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>
                        {editIndex !== null ? "Edit Item" : "Add New Item"}
                    </DialogTitle>
                    <TextField
                        margin="dense"
                        label="Item"
                        type="text"
                        fullWidth
                        value={newItem.title}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSave();
                            }
                        }}
                    />
                    <Button
                        onClick={handleSave}
                        color="primary"
                        disabled={!newItem || !newItem.title || !newItem.title.trim()}
                    >
                        {editIndex !== null ? "Update" : "Add"}
                    </Button>

                </Dialog>
            </div>
        </div>
    );
};
export default AddEditTopicsContainer;
