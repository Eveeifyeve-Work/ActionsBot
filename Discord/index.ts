


import new_Pr from "./pull_request/new";

if (process.argv.includes('--newpr')) {
    const userIndex = process.argv.indexOf('--user');
    const prIndex = process.argv.indexOf('--prid');
    const user = userIndex !== -1 ? process.argv[userIndex + 1] : "Null";
    const pullid = prIndex !== -1 ? process.argv[prIndex + 1] : "Null";
    new_Pr(pullid, user);
}

