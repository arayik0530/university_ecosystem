import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    createTopic,
    deleteTopic,
    getExistingTopics,
    removeTopic,
    updateTopic
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
    DialogActions
} from '@mui/material';
import {Add, Edit, Delete} from '@mui/icons-material';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        width: '400px',
        backgroundColor: theme.palette.background.paper,
    },
    addButton: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    list: {
        height: "40vh",
        overflowY: "scroll"
    }
}));

const AddEditTopicsContainer = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(getExistingTopics());
    }, [dispatch]);
    const topics = useSelector((state) => state.topic.topics);
    console.log('topics are', topics);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState('');


    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem(topics[index]);
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        dispatch(removeTopic(topics[index]))
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem('');
        setAddDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setAddDialogOpen(false);
    };

    const handleSave = () => {
        console.log(newItem, editIndex);
        if (editIndex) {
            dispatch(updateTopic({...topics[editIndex], title: newItem}));
        } else {
            dispatch(createTopic({title: newItem}));
        }
        setEditIndex(null);
        setNewItem('');
        setAddDialogOpen(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.list}>
                <List>
                    {topics.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item.title}/>
                            <ListItemSecondaryAction>
                                <IconButton title="Edit" onClick={() => handleEdit(index)} edge="end" aria-label="edit">
                                    <Edit style={{fontSize: '16px'}}/>
                                </IconButton>
                                <IconButton title="Delete" onClick={() => handleRemove(index)} edge="end"
                                            aria-label="delete">
                                    <Delete style={{fontSize: '16px'}}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
            <Button className={classes.addButton} variant="contained" startIcon={<Add/>} onClick={handleAdd}>
                Add New
            </Button>

            {/* Add Item Dialog */}
            <Dialog open={isAddDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <TextField
                    margin="dense"
                    label="Item"
                    type="text"
                    fullWidth
                    value={newItem.title}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSave();
                        }
                    }}
                />
                <Button onClick={handleSave} color="primary">
                    {editIndex !== null ? 'Update' : 'Add'}
                </Button>
            </Dialog>
        </div>
    );
};
export default AddEditTopicsContainer;
