import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../../../redux/actions/user/userActions";
import {makeStyles} from "tss-react/mui";
import {CenterBlockUi} from "../ui/CenterBlockUi";

const useStyles = makeStyles()({
    CenterBlockUi: {
        height: '90vh',/*TODO remove*/
        margin: 'auto',
        backgroundColor: 'antiquewhite',
        display: 'flex',
        flexDirection: "row"
    }
});

const CenterBlockContainer = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, []);
    const userType = useSelector((state) => state.user.userType);
    return (
        <CenterBlockUi
            classes={classes}
            userType={userType}
        />
    );
}

export default CenterBlockContainer;
