/*********************************

 File:       DashboardPage.js
 Function:   Dashboard
 Copyright:  AppDelegates LLC
 Date:       2019-10-09
 Author:     mkahn


 **********************************/

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import A8Paper from '../../components/core/A8Paper';
import a8api from '../../services/a8api'
import JSONPretty from "react-json-pretty";
import GuestCard from "../../components/guests/GuestCard";


const DashboardPage = props => {

    const [loaded, setLoaded] = useState(false);
    const [guests, setGuests] = useState([]);

    useEffect(()=>{
        async function getGuests() {
            const guests = await a8api.guests.getAll();
            setGuests(guests);
        }

        getGuests();

    },[])


    const gcards = guests.map(g=><GuestCard guest={g}/>);

    return (
        <A8Paper>
            {gcards}
            <JSONPretty json={guests}/>
        </A8Paper>
    );
};

DashboardPage.propTypes = {

};

export default DashboardPage;
