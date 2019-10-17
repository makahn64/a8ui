/*********************************

 File:       generate-demo-content.js
 Function:   Generates Demo Content
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn

 **********************************/

import faker from 'faker';
import a8api from '../a8api';
import _ from 'lodash';


const createFakeExperienceConfigs = async () => {

    await a8api.experienceConfig.create({
        name: 'Demo Dunking Tank',
        key: 'DDT',
        metadata: { demo: true }
    });

    await a8api.experienceConfig.create({
        name: 'Demo Photo Op',
        key: 'DPO',
        metadata: { demo: true }
    });

    await a8api.experienceConfig.create({
        name: 'Demo VR Experience',
        key: 'DVE',
        metadata: { demo: true }
    });

}

const generateFakeGuest = () => {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
        firstName,
        lastName,
        email: `${firstName}.${lastName}@demotest.com`,
        mobilePhone: faker.phone.phoneNumber(),
        legal: { signedRelease: true }
    }
};

const createFakeGuests = async count => {
    const rval = [];
    for (let c=0; c<count; c++){
        rval.push(await a8api.guests.create(generateFakeGuest()))
    }
    return rval;
}

const generateFakeExperience = guestUUID => {

    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);

    const e = {
        configKey: _.sample(['DPO', 'DVE', 'DDT']),
        metadata: { demo: true },
        experiencedAt: faker.date.between(yesterday, now)
    }

    if (guestUUID) e.guests = [guestUUID];

    return e;
}



export default {
    createFakeExperienceConfigs,
    generateFakeGuest,
    createFakeGuests,
    generateFakeExperience
}
