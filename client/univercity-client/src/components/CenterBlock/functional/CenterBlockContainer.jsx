import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../../../redux/actions/user/userActions";
import {makeStyles} from "@material-ui/core";
import {CenterBlockUi} from "../ui/CenterBlockUi";

const useStyles = makeStyles(() => ({
    CenterBlockUi: {
        height: '90vh',/*TODO remove*/
        margin: 'auto',
        backgroundColor: 'yellow',
        display: 'flex',
    }
}));

const CenterBlockContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    dispatch(getCurrentUser());
    const userType = useSelector((state) => state.user.userType);
    return (
        <CenterBlockUi
            classes={classes}
            usertype={userType}
        />
    );
}

export default CenterBlockContainer;
