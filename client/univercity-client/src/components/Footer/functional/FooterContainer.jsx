import React from 'react';
import FooterUI from '../ui/FooterUI';
import { makeStyles, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    footer: {
        width:'100%',
        // marginTop:'50px',
        height:'max-content',
        background:'#3F51B5',
    },
    footerCenterBlock:{
        width:'85%',
        margin:'auto',
        display:'flex',
        alignItems:'center',
        flexDirection:props => props.is767 ? 'column': 'initial',
        justifyContent:'space-between',
        padding: '2.604vw 0'
    },
    footerUl:{
        padding:'20px 0',
        margin:'0',
        '&>li':{
            listStyleType:'none',
            color:'white',
            padding:'5px 0'
        }
    },
    footerLogoBlock:{
        display:'flex',
        justifyContent:props => props.is767 ? 'center' : 'initial'
    }

}));

const FooterContainer = () => {
    const is767 = useMediaQuery('(max-width:767px)')
    const classes = useStyles({is767});
    return <FooterUI classes={classes} />
}

export default FooterContainer;
