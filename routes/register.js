const { Router } = require(`express`);
const router = Router();
const User = require("../schema/user")
const { hashPassword } = require("../utils/pwdManage")

router.use((req, res, next) => {
    if (req.user)
        res.redirect("/loggedin");
    else
        next();
})
router.get("/", (req, res) => {
    res.render("register.ejs");
});

router.post("/", async (req, res) => {
    if (req.body.password && req.body.username) {
        const userName = req.body.username;
        let check = await User.findOne({ username: userName }).exec();
        if (check) {
            res.status(400).send("username already exist");
        }
        else {
            const pwd = await hashPassword(req.body.password);
            const newUser = new User({
                username: userName,
                password: pwd,
            });
            await newUser.save();
            res.status(201).render("loggedin.ejs");
        }
    }
    else {
        res.send("data missing");
    }
});

module.exports = router;