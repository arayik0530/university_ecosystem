import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useDispatch, useSelector } from "react-redux";
import {
    createTopic,
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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

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
            width: "8px", // Adjust the scrollbar width
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver",
            borderRadius: "5px", // Add border-radius to scrollbar thumb
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        },
    },
    listItemContainer: {
        "&:hover": {
            backgroundColor: "antiquewhite", // Change the background color on hover
        },
    },
});

const AddEditTopicsContainer = () => {
    const dispatch = useDispatch();
    const { classes } = useStyles();
    useEffect(() => {
        dispatch(getExistingTopics());
    }, [dispatch]);
    const topics = useSelector((state) => state.topic.topics);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({ title: "" });

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem({ title: topics[index].title });
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        dispatch(removeTopic(topics[index]));
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem({ title: "" });
        setAddDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setAddDialogOpen(false);
    };

    const handleSave = () => {
        if (editIndex !== null) {
            if (newItem.title !== topics[editIndex].title) {
                dispatch(updateTopic({ ...topics[editIndex], title: newItem.title }));
            }
        } else {
            dispatch(createTopic({ title: newItem.title }));
        }
        setEditIndex(null);
        setNewItem({ title: "" });
        handleCloseDialog();
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
                                <ListItemText primary={item.title} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        title="Edit"
                                        onClick={() => handleEdit(index)}
                                        edge="end"
                                        aria-label="edit"
                                    >
                                        <Edit style={{ fontSize: "16px" }} />
                                    </IconButton>
                                    <IconButton
                                        title="Delete"
                                        onClick={() => handleRemove(index)}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <Delete style={{ fontSize: "16px" }} />
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
                        startIcon={<Add />}
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
                        value={newItem.title || ""}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                if(newItem.title && topics.map(t => t.title).indexOf(newItem.title) == -1) {
                                    handleSave();
                                }
                            }
                        }}
                    />
                    <Button
                        onClick={handleSave}
                        color="primary"
                        disabled={!newItem.title || topics.map(t => t.title).indexOf(newItem.title) != -1}
                    >
                        {editIndex !== null ? "Update" : "Add"}
                    </Button>

                </Dialog>
            </div>
        </div>
    );
};
export default AddEditTopicsContainer;
