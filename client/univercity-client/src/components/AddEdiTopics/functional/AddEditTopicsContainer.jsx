import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useDispatch, useSelector } from "react-redux";
import {
    createTopic,
    getExistingTopics,
    removeTopic, setSelectedPageIndex,
    updateTopic,
} from "../../../redux/actions/topic/topicActions";
import {
    Button,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
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
    const topicsContainer = useSelector((state) => state.topic);
    const selectedPageIndex = topicsContainer.selectedPageIndex;
    const elementsPerPage = topicsContainer.elementsPerPage;
    useEffect(() => {
        dispatch(getExistingTopics(selectedPageIndex.index, elementsPerPage));
    }, [selectedPageIndex]);
    const topics = topicsContainer.topics;
    const totalCount = topicsContainer.totalCount;
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({ title: "" });

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem({ title: topics[index].title });
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        let pagIndex = selectedPageIndex.index;
        if(selectedPageIndex > 0 && topics.length === 1){
            pagIndex--;
        }
        try {
            dispatch(removeTopic(topics[index], pagIndex, elementsPerPage));
        } catch (e){}
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem({ title: "" });
        setAddDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setAddDialogOpen(false);
    };

    const handlePageChange = (event, page) => {
        // console.log('selecting page : ', page);
        // dispatch(setSelectedPageIndex(page - 1));
        if(page - 1 !== selectedPageIndex.index) {
            dispatch(setSelectedPageIndex({
                index: page - 1
            }));
        }
    };

    const handleSave = () => {
        if (editIndex !== null) {
            if (newItem.title !== topics[editIndex].title) {
                dispatch(updateTopic({...topics[editIndex], title: newItem.title}));
            }
        } else {
            try {
                dispatch(createTopic({title: newItem.title}, 0, elementsPerPage));
                // console.log('before redirecting to first page');
                // if(selectedPageIndex === 0){
                //     dispatch(getExistingTopics(selectedPageIndex, elementsPerPage));
                // } else {
                //     dispatch(setSelectedPageIndex(0));
                // }

            } catch (e) {
            }
        }
        setEditIndex(null);
        setNewItem({title: ""});
        handleCloseDialog();
    };
    const pageCount = Math.ceil(totalCount / elementsPerPage);
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
                {pageCount > 1 &&
                <Stack spacing={2}>
                    <Pagination count={pageCount} page={selectedPageIndex.index + 1} onChange={handlePageChange}/>
                </Stack>
                }
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

                <Dialog
                    open={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    maxWidth="l" // twice wider
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
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if(newItem.title && topics.map(t => t.title).indexOf(newItem.title) === -1) {
                                        handleSave();
                                    }
                                }
                            }}
                            inputProps={{ maxLength: 255 }}
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
        </div>
    );
};
export default AddEditTopicsContainer;
