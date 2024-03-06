import {useDispatch, useSelector} from "react-redux";
import {setSelectedPart} from "../../../redux/actions/admin/adminActions";
import {AdminUi} from "../../Admin/ui/AdminUi";
import React from "react";
import UserUi from "../ui/UserUi";

const UserContainer = () => {
    // const dispatch = useDispatch();
    // const selectedPart = useSelector((state) => state.admin.selectedPart);
    //
    // const selectPart = (part) => {
    //     dispatch(setSelectedPart(part));
    // }

    return (
        <UserUi/>
    );
}

export default UserContainer;
