/*********************************

 File:       filters.js
 Function:   Filters for searching for data
 Copyright:  AppDelegates LLC
 Date:       2019-10-16
 Author:     mkahn

 **********************************/

import _ from 'lodash';

// TODO DRY this out

export const fullGuestFilterTest = (guest, stringQuery) => {

    const fieldsOfInterest = _.compact([
        guest.email,
        guest.firstName,
        guest.lastName
    ]);

    const rval = fieldsOfInterest.some(field => field.includes(stringQuery));
    console.log(rval);

    return rval;

}

export const fullGuestFilter = (guests, stringQuery) => {
    return guests.filter(g => fullGuestFilterTest(g, stringQuery));
}

export const fullExperienceFilterTest = (experience, stringQuery) => {

    const fieldsOfInterest = _.compact([
        experience.name,
        experience.configKey,
        // This blows up all the emails so we can search them
        ...experience.guests.map(g=>g.email)
    ]);

    const rval = fieldsOfInterest.some(field => field.includes(stringQuery));
    console.log(rval);

    return rval;

}

export const fullExperienceFilter = (experiences, stringQuery) => {
    return experiences.filter(e => fullExperienceFilterTest(e, stringQuery));
}

export default {
    fullGuestFilter,
    fullExperienceFilter
}
