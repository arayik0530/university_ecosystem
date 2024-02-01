import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createTopic,
    getExistingTopics,
    removeTopic,
    setPageElementCount,
    setSelectedPageIndex, setTitleForFilter,
    updateTopic,
} from "../../../redux/actions/topic/topicActions";
import AddEditTopicsUi from "../ui/AddEditTopicUi";

const AddEditTopicsContainer = () => {
    const dispatch = useDispatch();
    const topicsContainer = useSelector((state) => state.topic);
    const selectedPageIndex = topicsContainer.selectedPageIndex;
    const elementsPerPage = topicsContainer.elementsPerPage;
    const titleForFilter = topicsContainer.titleForFilter;
    useEffect(() => {
        dispatch(getExistingTopics(selectedPageIndex.index, elementsPerPage.count, titleForFilter.text));
    }, [selectedPageIndex, elementsPerPage, titleForFilter]);
    const topics = topicsContainer.topics;
    const totalCount = topicsContainer.totalCount;
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({title: ""});
    const [elementsPerPageCount, setElementsPerPageCount] = useState(elementsPerPage.count);
    const [filterTitle, setFilterTitle] = useState(titleForFilter.text);

    const setPageElementsCount = (count) => {
        if(count !== elementsPerPage.count) {
            dispatch(setPageElementCount({
                count: count
            }));
        }
    };

    const filterByTitle = (text) => {
        if(text !== titleForFilter.text) {
            dispatch(setTitleForFilter({
                text: text
            }));
        }
    };


    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem({title: topics[index].title});
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        let pagIndex = selectedPageIndex.index;
        if (selectedPageIndex > 0 && topics.length === 1) {
            pagIndex--;
        }
        dispatch(removeTopic(topics[index], pagIndex, elementsPerPage.count, titleForFilter.text));
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem({title: ""});
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
            if (newItem.title !== topics[editIndex].title) {
                dispatch(updateTopic({...topics[editIndex], title: newItem.title}));
            }
        } else {
            dispatch(createTopic({title: newItem.title}, 0, elementsPerPage.count, titleForFilter.text));
        }
        setEditIndex(null);
        setNewItem({title: ""});
        handleCloseDialog();
    };
    const pageCount = Math.ceil(totalCount / elementsPerPage.count);
    return (
        <AddEditTopicsUi
            topics={topics}
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
            filterTitle={filterTitle}
            setFilterTitle={setFilterTitle}
            filterByTitle={filterByTitle}
        />
    );
};
export default AddEditTopicsContainer;
