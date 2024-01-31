import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createTopic,
    getExistingTopics,
    removeTopic,
    setPageElementCount,
    setSelectedPageIndex,
    updateTopic,
} from "../../../redux/actions/topic/topicActions";
import AddEditTopicsUi from "../ui/AddEditTopicUi";

const AddEditTopicsContainer = () => {
    const dispatch = useDispatch();
    const topicsContainer = useSelector((state) => state.topic);
    const selectedPageIndex = topicsContainer.selectedPageIndex;
    const elementsPerPage = topicsContainer.elementsPerPage;
    useEffect(() => {
        dispatch(getExistingTopics(selectedPageIndex.index, elementsPerPage.count));
    }, [selectedPageIndex, elementsPerPage]);
    const topics = topicsContainer.topics;
    const totalCount = topicsContainer.totalCount;
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({title: ""});

    const setElementsPerPageCount = (count) => {
        dispatch(setPageElementCount({
            count: count
        }));
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
        try {
            dispatch(removeTopic(topics[index], pagIndex, elementsPerPage.count));
        } catch (e) {
        }
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
            try {
                dispatch(createTopic({title: newItem.title}, 0, elementsPerPage.count));
            } catch (e) {
            }
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
            pageElementCount={elementsPerPage.count}
        />
    );
};
export default AddEditTopicsContainer;
