import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createGroup,
    getExistingGroups,
    removeGroup,
    setNameForFilter,
    setNameForUserFilter,
    setPageElementCount,
    setSelectedPageIndex,
    updateGroup,
} from "../../../redux/actions/group/groupActions";
import AddEditGroupsUi from "../ui/AddEditGroupsUi";
import API from "../../../API";

const AddEditGroupsContainer = () => {
    const dispatch = useDispatch();
    const groupsContainer = useSelector((state) => state.group);
    const selectedPageIndex = groupsContainer.selectedPageIndex;
    const elementsPerPage = groupsContainer.elementsPerPage;
    const nameForFilter = groupsContainer.nameForFilter;
    const nameForUserFilter = groupsContainer.nameForUserFilter;
    useEffect(() => {
        dispatch(getExistingGroups(selectedPageIndex.index, elementsPerPage.count, nameForFilter.text, nameForUserFilter.text));
    }, [selectedPageIndex, elementsPerPage, nameForFilter, nameForUserFilter]);
    const groups = groupsContainer.groups;
    const totalCount = groupsContainer.totalCount;
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({name: "", id: null, userIdList: []});
    const [elementsPerPageCount, setElementsPerPageCount] = useState(elementsPerPage.count);
    const [filterName, setFilterName] = useState(nameForFilter.text);
    const [filterUserName, setFilterUserName] = useState(nameForUserFilter.text);
    const [allUsers, setAllUsers] = useState([]);

    const setPageElementsCount = (count) => {
        if (count !== elementsPerPage.count) {
            dispatch(setPageElementCount({
                count: count
            }));
        }
    };

    useEffect(() => {
        API.get('/user/all/lite')
            .then(users => {
                setAllUsers(users.data);
            })
            .catch(e => {
            });
    }, []);

    const filterByName = (text) => {
        if (text !== nameForFilter.text) {
            dispatch(setNameForFilter({
                text: text
            }));
        }
    };

    const filterByUserName = (text) => {
        if (text !== nameForUserFilter.text) {
            dispatch(setNameForUserFilter({
                text: text
            }));
        }
    };


    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItem({name: groups[index].name, id: groups[index].id, userIdList: groups[index].userIdList});
        setAddDialogOpen(true);
    };

    const handleRemove = (index) => {
        let pagIndex = selectedPageIndex.index;
        if (selectedPageIndex > 0 && groups.length === 1) {
            pagIndex--;
        }
        dispatch(removeGroup(groups[index], pagIndex, elementsPerPage.count, nameForFilter.text, nameForUserFilter.text));
    };

    const handleAdd = () => {
        setEditIndex(null);
        setNewItem({name: "", id: null, userIdList: []});
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
            if (newItem.name !== groups[editIndex].name || !arraysAreEqual(groups[editIndex].userIdList, newItem.userIdList)) {
                dispatch(updateGroup({...groups[editIndex], name: newItem.name, userIdList: newItem.userIdList}));
            }
        } else {
            dispatch(createGroup({
                name: newItem.name,
                userIdList: newItem.userIdList
            }, 0, elementsPerPage.count, nameForFilter.text, nameForUserFilter.text));
        }
        setEditIndex(null);
        setNewItem({name: "", id: null, userIdList: []});
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
        filterByUserName={filterByUserName}
        setFilterUserName={setFilterUserName}
        filterUserName={filterUserName}
        allUsers={allUsers}
        arraysAreEqual={arraysAreEqual}
    />);
};

function arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

export default AddEditGroupsContainer;
