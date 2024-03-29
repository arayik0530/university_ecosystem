import {makeStyles} from "tss-react/mui";
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import QuestionDialog from "./QuestionDialog";
import {Add, Delete, Edit} from "@mui/icons-material";

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
        backgroundColor: '#0000FF',
        color: '#ffffff',
        width: "150px"
    },
    listContainer: {
        position: "relative",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
    },
    list: {
        height: "55vh",
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
    rightSidebarLabel: {
        fontSize: "12px"
    },
    questionDialog: {
        height: "55vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver",
            borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: 'white',
        },
    },
    textarea: {
        borderRadius: "4px",
        minHeight: "70px !important",
        fontSize: "20px",
        border: "2px solid #8080802e",
        width: '100%',
        maxWidth: "100% !important",
        marginBottom: '16px',
        "&:focus": {
            transition: "border-color 0.2s ease",
            borderStyle: "solid",
            borderColor: "#1976d2",
            outline: "none"
        }
    }
});

const AddEditQuestionsUi = ({
                                questions,
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
                                filterText,
                                setFilterText,
                                filterByText,
                                topics,
                                filterTopic,
                                filterByTopic,
                                isQuestionValid
                            }) => {
    const {classes} = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={`${classes.listContainer} ${classes.list}`}>
                    <List>
                        {questions.map((item, index) => (
                            <ListItem
                                key={index}
                                className={classes.listItemContainer}
                            >
                                <ListItemText primary={item.text}/>
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
                    <Stack spacing={2} style={{marginTop: "5px"}}>
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

                <QuestionDialog
                    isAddDialogOpen={isAddDialogOpen}
                    handleCloseDialog={handleCloseDialog}
                editIndex={editIndex}
                classes={classes}
                newItem={newItem}
                setNewItem={setNewItem}
                topics={topics}
                handleSave={handleSave}
                isQuestionValid={isQuestionValid}
                />
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
                        onBlur={
                            e => {
                                setPageElementsCount(e.target.value);
                            }
                        }
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
                    <label className={classes.rightSidebarLabel}>{"Filter by Question"}</label>
                    <input
                        style={{width: '100%'}}
                        type="text"
                        value={filterText}
                        onChange={e => {
                            setFilterText(e.target.value);
                        }}
                        onBlur={
                            e => {
                                filterByText(e.target.value);
                            }
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                filterByText(e.target.value);
                            }
                        }}
                        inputMode="text"
                    />
                </div>
                <div>
                    <label className={classes.rightSidebarLabel}>{"Filter by Topic"}</label>
                    <select
                        style={{width: '100%'}}
                        onChange={e => {
                            filterByTopic(e.target.value);
                        }}
                        value={filterTopic}
                    >
                        <option value="">Select Topic</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>
                                {topic.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
export default AddEditQuestionsUi;
