import {makeStyles} from "tss-react/mui";
import {
    Button,
    Checkbox,
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
    Typography,
} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from "react";

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
        display: "flex", flexDirection: "column", width: "100%", alignItems: "center",
    },
    addButtonContainer: {
        marginTop: "1%", width: "15%",
    },
    addButton: {
        backgroundColor: '#0000FF', color: '#ffffff', width: "150px"
    },
    listContainer: {
        position: "relative", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden",
    },
    list: {
        height: "55vh", overflowY: "scroll", width: "80%", backgroundColor: '#EFE5D5', "&::-webkit-scrollbar": {
            width: "8px",
        }, "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver", borderRadius: "5px",
        }, "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        },
    },
    listItemContainer: {
        "&:hover": {
            backgroundColor: "antiquewhite",
        }
    },
    rightSideBarContainer: {
        display: "flex", flexDirection: "column", width: "150px"
    },
    elementCountInput: {
        width: "25%", display: "block"
    },
    rightSidebarLabel: {
        fontSize: "12px"
    },
    rightSidebarInput: {
        width: "100%",
    },
    userContainer: {
        marginTop: "20px",
    },
    users: {
        overflowY: 'auto', height: "300px", "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver", borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        }
    }
});

const AddEditGroupsUi = ({
                             groups,
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
                             elementsPerPageCount,
                             setPageElementsCount,
                             filterName,
                             setFilterName,
                             filterByName,
                             filterByUserName,
                             setFilterUserName,
                             filterUserName,
                             allUsers,
                             arraysAreEqual
                         }) => {
    const {classes} = useStyles();

    return (<div className={classes.root}>
            <div className={classes.content}>
                <div className={`${classes.listContainer} ${classes.list}`}>
                    <List>
                        {groups.map((item, groupIndex) => (<ListItem
                                key={groupIndex}
                                className={classes.listItemContainer}
                            >
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        title="Edit"
                                        onClick={() => handleEdit(groupIndex)}
                                        edge="end"
                                        aria-label="edit"
                                    >
                                        <Edit style={{fontSize: "16px"}}/>
                                    </IconButton>
                                    <IconButton
                                        title="Delete"
                                        onClick={() => handleRemove(groupIndex)}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <Delete style={{fontSize: "16px"}}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>))}
                    </List>
                </div>
                {pageCount > 1 && <Stack spacing={2} style={{marginTop: "5px"}}>
                    <Pagination count={pageCount} page={selectedPageIndex.index + 1} onChange={handlePageChange}/>
                </Stack>}
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
                        {editIndex !== null ? "Edit Group" : "Add New Group"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Group"
                            type="text"
                            fullWidth
                            value={newItem.name || ""}
                            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (newItem.name && groups.map(t => t.name).indexOf(newItem.name) === -1) {
                                        handleSave();
                                    }
                                }
                            }}
                            inputProps={{maxLength: 255}}
                        />
                        <div className={classes.userContainer}>
                            <Typography variant="h6">Group Users</Typography>
                            <div className={classes.users}>
                                {allUsers.map((user, index) => (<div key={index}>
                                        <Checkbox
                                            style={{
                                                transform: "scale(0.6)",
                                            }}
                                            // Handle checkbox state here
                                            checked={newItem.userIdList.includes(user.id)}
                                            // Handle checkbox change here
                                            onChange={(e) => {
                                                setNewItem({
                                                    ...newItem,
                                                    userIdList: e.target.checked ? [...newItem.userIdList, user.id] :
                                                        newItem.userIdList.filter(element => element !== user.id)
                                                });
                                            }}
                                        />
                                        <span style={{fontSize: "0.9rem"}}>
                                            {user.firstName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.lastName}
                                        </span>
                                    </div>))}
                            </div>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            onClick={handleSave}
                            color="primary"
                            disabled={!newItem.name || (groups.map(t => t.name).indexOf(newItem.name) !== -1 &&
                                (editIndex != null ?
                                    arraysAreEqual(groups.filter(g => g.id === newItem.id)[0].userIdList, newItem.userIdList) :
                                    false))}
                        >
                            {editIndex !== null ? "Update" : "Add"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={classes.rightSideBarContainer}>
                <div>
                    <label className={classes.rightSidebarLabel}>{"Elements per page"}</label>
                    <input
                        className={classes.elementCountInput}
                        type="text"
                        value={elementsPerPageCount}
                        onChange={e => {
                            let value = e.target.value;
                            if (!value || value <= 0) {
                                value = 10;
                            }
                            setElementsPerPageCount(value);
                        }}
                        onBlur={e => {
                            setPageElementsCount(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setPageElementsCount(e.target.value);
                            }
                        }}
                        maxLength={2}
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                </div>
                <div>
                    <label className={classes.rightSidebarLabel}>{"Filter by Group"}</label>
                    <input
                        className={classes.rightSidebarInput}
                        type="text"
                        value={filterName}
                        onChange={e => {
                            setFilterName(e.target.value);
                        }}
                        onBlur={e => {
                            filterByName(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                filterByName(e.target.value);
                            }
                        }}
                        inputMode="text"
                    />
                </div>
                <div>
                    <label className={classes.rightSidebarLabel}>{"Filter by User"}</label>
                    <input
                        className={classes.rightSidebarInput}
                        type="text"
                        value={filterUserName}
                        onChange={e => {
                            setFilterUserName(e.target.value);
                        }}
                        onBlur={e => {
                            filterByUserName(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                filterByUserName(e.target.value);
                            }
                        }}
                        inputMode="text"
                    />
                </div>
            </div>
        </div>);
};
export default AddEditGroupsUi;
