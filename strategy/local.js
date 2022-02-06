const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../schema/user");
const { comparePassword } = require("../utils/pwdManage");

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (_id, done) => {
    const user = await User.findById(_id);
    if (user) {
        done(null, user);
    }
});


passport.use(
    new Strategy({
        usernameField: "username"
    }, async (username, password, done) => {
        try {
            if (username && password) {
                User.findOne({ username: username }, async (err, user) => {
                    if (!err) {
                        if (!user) {
                            done(new Error("user not found"));
                        }
                        else {
                            const check = await comparePassword(password, user.password)
                            if (check)
                                done(null, user);
                            else
                                done(new Error("wrong password"));
                        }
                    }
                    else {
                        done(err);
                    }
                });
            }
            else {
                done(new Error("Data missing"));
            }
        }
        catch (err) {
            done(err);
        }
    })
);