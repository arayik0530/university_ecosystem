import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createGroup,
    getExistingGroups,
    removeGroup,
    setNameForFilter,
    setPageElementCount,
    setSelectedPageIndex,
    updateGroup,
} from "../../../redux/actions/group/groupActions";
import AddEditGroupsUi from "../ui/AddEditGroupsUi";

const AddEditGroupsContainer = () => {
    const dispatch = useDispatch();
    const groupsContainer = useSelector((state) => state.group);
    const selectedPageIndex = groupsContainer.selectedPageIndex;
    const elementsPerPage = groupsContainer.elementsPerPage;
    const nameForFilter = groupsContainer.nameForFilter;
    useEffect(() => {
        dispatch(getExistingGroups(selectedPageIndex.index, elementsPerPage.count, nameForFilter.text));
    }, [selectedPageIndex, elementsPerPage, nameForFilter]);
    const groups = groupsContainer.groups;
    const totalCount = groupsContainer.totalCount;
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({name: ""});
    const [elementsPerPageCount, setElementsPerPageCount] = useState(elementsPerPage.count);
    const [filterName, setFilterName] = useState(nameForFilter.text);

    const setPageElementsCount = (count) => {
        if (count !== elementsPerPage.count) {
            dispatch(setPageElementCount({
                count: count
            }));
        }
    };

    const filterByName = (text) => {
        if (text !== nameForFilter.text) {
            dispatch(setNameForFilter({
                text: text
            }));
        }
    };


    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem({name: groups[index].name});
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        let pagIndex = selectedPageIndex.index;
        if (selectedPageIndex > 0 && groups.length === 1) {
            pagIndex--;
        }
        dispatch(removeGroup(groups[index], pagIndex, elementsPerPage.count, nameForFilter.text));
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem({name: ""});
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
            if (newItem.name !== groups[editIndex].name) {
                dispatch(updateGroup({...groups[editIndex], name: newItem.name}));
            }
        } else {
            dispatch(createGroup({name: newItem.name}, 0, elementsPerPage.count, nameForFilter.text));
        }
        setEditIndex(null);
        setNewItem({name: ""});
        handleCloseDialog();
    };
    const pageCount = Math.ceil(totalCount / elementsPerPage.count);
    return (<AddEditGroupsUi
            groups={groups}
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
            filterName={filterName}
            setFilterName={setFilterName}
            filterByName={filterByName}
        />);
};
export default AddEditGroupsContainer;
