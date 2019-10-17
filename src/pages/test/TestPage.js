/*********************************

 File:       TestPage.js
 Function:   What it says
 Copyright:  AppDelegates LLC
 Date:       2019-10-09
 Author:     mkahn

 **********************************/

import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import A8Paper from "../../components/core/A8Paper";
import { withSnackbar } from 'notistack';


const colors = ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error'];

const TestPage = props => {

    const [colorIdx, setColor] = useState(0);
    const [loaded, setLoaded] = useState(false);
    setTimeout(()=>{
        props.enqueueSnackbar('Successfully fetched the data.', { variant: 'error'});
    }, 1000)

    return (
        <A8Paper>
            <h1>Dashboard!</h1>
            <Typography variant="h5" component="h3">
                This is a sheet of paper.
            </Typography>
            <Typography component="p">
                Paper can be used to build surface or other elements for your application.
            </Typography>
            <Typography variant="body1">This is body1</Typography>
            <Typography variant="body2">This is body2</Typography>
            <Typography variant="body2" color="error" onMouseOver={()=>console.log('mouse over!')}>This is body2</Typography>
            <Typography variant="h1" color={colors[colorIdx]} onMouseOver={()=>setColor((colorIdx+1)%colors.length)}>This ismorpherous</Typography>
            <Typography variant="body2" style={{color: "teal"}}>This is body2 in orange</Typography>
        </A8Paper>
    )
}

export default withSnackbar(TestPage);
