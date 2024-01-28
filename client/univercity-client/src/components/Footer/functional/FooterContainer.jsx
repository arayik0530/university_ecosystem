import React from 'react';
import FooterUI from '../ui/FooterUI';
import {makeStyles} from "tss-react/mui";
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles()({
    footer: {
        width:'100%',
        // marginTop:'50px',
        height:'max-content',
        background:'#3F51B5',
        position: 'fixed',
        bottom: '0'
    },
    footerCenterBlock:{
        width:'85%',
        // margin:'auto',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        // padding: '2.604vw 0'
    },
    footerUl:{
        padding:'0 0',
        margin:'0',
        '&>li':{
            listStyleType:'none',
            color:'white',
            padding:'5px 0'
        }
    },
    footerLogoBlock:{
        display:'flex',
        justifyContent: 'initial'
    }

});

const FooterContainer = () => {
    // const is767 = useMediaQuery('(max-width:767px)')
    // const classes = useStyles({is767});
    const {classes} = useStyles();
    return <FooterUI classes={classes} />
}

export default FooterContainer;
