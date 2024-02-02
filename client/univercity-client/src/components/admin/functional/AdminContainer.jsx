import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AdminUi} from "../ui/AdminUi";
import {setSelectedPart} from "../../../redux/actions/admin/adminActions";

const AdminContainer = () => {
    const dispatch = useDispatch();
    const selectedPart = useSelector((state) => state.admin.selectedPart);

    const selectPart = (part) => {
        dispatch(setSelectedPart(part));
    }

    return (
        <AdminUi
            selectedPart={selectedPart}
            selectPart={selectPart}
        />
    );
}

export default AdminContainer;
