import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextareaAutosize,
    TextField,
} from "@mui/material";
import {Close, Delete} from "@mui/icons-material";

const QuestionDialog = ({
                            isAddDialogOpen,
                            handleCloseDialog,
                            editIndex,
                            classes,
                            newItem,
                            setNewItem,
                            topics,
                            handleSave,
                            isQuestionValid
                        }) => {
    return (
        <Dialog
            open={isAddDialogOpen}
            onClose={handleCloseDialog}
            maxWidth="l"
            fullWidth
            PaperProps={{
                style: {
                    width: "calc(100% - 64px * 8)"
                },
            }}
        >
            <DialogTitle>
                {editIndex !== null ? "Edit Question" : "Add New Question"}
                <div>
                    <label style={{marginRight: '3%'}} className={classes.rightSidebarLabel}>{"Topic"}</label>
                    <select
                        disabled={newItem.isUsedInQuizzes}
                        style={{width: '200px'}}
                        onChange={(e) => {
                            setNewItem({
                                ...newItem,
                                topicId: (e.target.value !== "0" ? e.target.value : null)
                            });
                        }}
                        value={newItem.topicId ? newItem.topicId : "0"}
                    >
                        <option value="0">Select Topic</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>
                                {topic.title}
                            </option>
                        ))}
                    </select>
                </div>
                <IconButton aria-label="close" onClick={handleCloseDialog}
                            title={"Close"}
                            sx={{position: 'absolute', right: 8, top: 8}}>
                    <Close/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.questionDialog} style={{width: '100%', marginBottom: '16px'}}>
                <div>
                    <TextareaAutosize
                        className={classes.textarea}
                        disabled={newItem.isUsedInQuizzes}
                        aria-label="Question"
                        placeholder="Question"
                        value={newItem.text}
                        onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                    />
                    <div className={classes.answerList}>
                        {newItem.answers.map((answer, index) => (
                            <div key={index}
                                 style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                <TextField
                                    disabled={newItem.isUsedInQuizzes}
                                    margin="dense"
                                    label={`Answer ${index + 1}`}
                                    type="text"
                                    value={answer.text}
                                    onChange={(e) => {
                                        setNewItem({
                                            ...newItem,
                                            answers: [
                                                ...newItem.answers.slice(0, index),
                                                {...newItem.answers[index], text: e.target.value},
                                                ...newItem.answers.slice(index + 1)
                                            ]
                                        });
                                    }
                                    }
                                    style={{flex: 1, marginRight: '8px'}}
                                />
                                <Checkbox
                                    disabled={newItem.isUsedInQuizzes}
                                    title="Right answer"
                                    color="primary"
                                    checked={answer.rightAnswer}
                                    onChange={(e) => {
                                        setNewItem({
                                            ...newItem,
                                            answers: [
                                                ...newItem.answers.slice(0, index),
                                                {...newItem.answers[index], rightAnswer: e.target.checked},
                                                ...newItem.answers.slice(index + 1)
                                            ]
                                        });
                                    }
                                    }
                                    style={{marginRight: '8px'}}
                                />
                                <IconButton
                                    disabled={newItem.isUsedInQuizzes}
                                    title="Delete"
                                    onClick={() => {
                                        setNewItem({
                                            ...newItem,
                                            answers: newItem.answers.filter((_, idx) => idx !== index)
                                        })
                                    }
                                    }
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <Delete style={{fontSize: "24px"}}/>
                                </IconButton>
                            </div>
                        ))}
                    </div>
                    <Button variant="outlined" onClick={() => {
                        setNewItem({
                            ...newItem,
                            answers: [
                                ...newItem.answers,
                                {text: "", rightAnswer: false}
                            ]
                        })
                    }
                    }
                            style={{marginTop: '8px', marginBottom: '16px'}}
                            disabled={newItem.isUsedInQuizzes}
                    >
                        Add Answer
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSave}
                    color="primary"
                    disabled={!isQuestionValid() || newItem.isUsedInQuizzes}
                >
                    {editIndex !== null ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default QuestionDialog;
