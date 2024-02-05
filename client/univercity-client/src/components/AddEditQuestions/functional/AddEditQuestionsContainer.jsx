import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createQuestion,
    getExistingQuestions,
    removeQuestion,
    setPageElementCount,
    setSelectedPageIndex, setTextForFilter, setTopicForFilter,
    updateQuestion,
} from "../../../redux/actions/questions/questionsActions";
import AddEditTopicsUi from "../ui/AddEditQuestionsUi";

const AddEditQuestionsContainer = () => {
    const dispatch = useDispatch();
    const questionsContainer = useSelector((state) => state.questions);
    const topicsContainer = useSelector((state) => state.topic);
    const topics = topicsContainer.topics;
    const selectedPageIndex = questionsContainer.selectedPageIndex;
    const elementsPerPage = questionsContainer.elementsPerPage;
    const textForFilter = questionsContainer.textForFilter;
    const topicForFilter = questionsContainer.topicForFilter;
    useEffect(() => {
        dispatch(getExistingQuestions(selectedPageIndex.index, elementsPerPage.count, textForFilter.text, topicForFilter.id));
    }, [selectedPageIndex, elementsPerPage, textForFilter, dispatch, topicForFilter]);
    const questions = questionsContainer.questions;
    const totalCount = questionsContainer.totalCount;
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({
        text: "",
        answers: [],
        isUsedInQuizzes: false,
        topicId: null
    });
    const [elementsPerPageCount, setElementsPerPageCount] = useState(elementsPerPage.count);
    const [filterText, setFilterText] = useState(textForFilter.text);
    const filterTopic = topicForFilter.id;

    const setPageElementsCount = (count) => {
        if(count !== elementsPerPage.count) {
            dispatch(setPageElementCount({
                count: count
            }));
        }
    };

    const filterByText = (text) => {
        if(text !== textForFilter.text) {
            dispatch(setTextForFilter({
                text: text
            }));
        }
    };

    const filterByTopic = (topicId) => {
        if(topicId !== topicForFilter.id) {
            dispatch(setTopicForFilter({
                id: topicId
            }));
        }
    };


    const handleEdit = (index) => {
        setEditIndex(index);
        const question = questions[index];
        setNewItem({
            text: question.text,
            answers: question.answers,
            isUsedInQuizzes: question.isUsedInQuizzes,
            topicId: question.topicId
        });
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        let pagIndex = selectedPageIndex.index;
        if (selectedPageIndex > 0 && questions.length === 1) {
            pagIndex--;
        }
        dispatch(removeQuestion(questions[index], pagIndex, elementsPerPage.count, textForFilter.text, filterTopic));
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem({
            text: "",
            answers: [],
            isUsedInQuizzes: false,
            topicId: null
        });
        setAddDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setAddDialogOpen(false);
    };

    const handlePageChange = (event, page) => {
        if (page - 1 !== selectedPageIndex.index) {
            dispatch(setSelectedPageIndex({
                index: page - 1
            }));
        }
    };

    const handleSave = () => {
        if (editIndex !== null) {
            dispatch(updateQuestion({...questions[editIndex], text: newItem.text, answers: newItem.answers, isUsedInQuizzes: newItem.isUsedInQuizzes, topicId: newItem.topicId}));
        } else {
            dispatch(createQuestion({text: newItem.text, answers: newItem.answers, isUsedInQuizzes: newItem.isUsedInQuizzes, topicId: newItem.topicId}, 0, elementsPerPage.count, textForFilter.text, filterTopic));
        }
        setEditIndex(null);
        setNewItem({
            text: "",
            answers: [],
            isUsedInQuizzes: false,
            topicId: null
        });
        handleCloseDialog();
    };
    const isQuestionValid = () => {
        if (!newItem.text || newItem.answers.length === 0 || !newItem.topicId) {
            return false;
        }
        let hasAtLeastOneRightAnswer = false;
        for (const answer of newItem.answers) {
            if (!answer.text) {
                return false;
            }
            if (answer.rightAnswer) {
                hasAtLeastOneRightAnswer = true;
            }
        }
        return hasAtLeastOneRightAnswer;
    };
    const pageCount = Math.ceil(totalCount / elementsPerPage.count);
    return (
        <AddEditTopicsUi
            questions={questions}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            pageCount={pageCount}
            selectedPageIndex={selectedPageIndex}
            handlePageChange={handlePageChange}
            handleAdd={handleAdd}
            isAddDialogOpen={isAddDialogOpen}
            handleCloseDialog={handleCloseDialog}
            editIndex={editIndex}
            newItem={newItem}
            setNewItem={setNewItem}
            handleSave={handleSave}
            setElementsPerPageCount={setElementsPerPageCount}
            elementsPerPageCount={elementsPerPageCount}
            setPageElementsCount={setPageElementsCount}
            filterText={filterText}
            setFilterText={setFilterText}
            filterByText={filterByText}
            topics={topics}
            filterTopic={filterTopic}
            filterByTopic={filterByTopic}
            isQuestionValid={isQuestionValid}
        />
    );
};
export default AddEditQuestionsContainer;
