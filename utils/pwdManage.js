const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(pwd) {
    hash = await bcrypt.hash(pwd, saltRounds);
    return hash;
}

async function comparePassword(rawpwd, hashpwd) {
    ans = await bcrypt.compare(rawpwd, hashpwd);
    return ans;
}

module.exports = {
    hashPassword,
    comparePassword
};