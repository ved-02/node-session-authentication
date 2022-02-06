const { Router } = require(`express`);
const passport = require("passport");
const router = Router();
const User = require("../schema/user")

router.use((req, res, next)=>{
    if(req.user)
        res.redirect("/loggedin");
    else
        next();
})
router.get("/",
    (req, res) => {
        res.render(`login.ejs`);
    });
router.post("/",
    passport.authenticate("local", { failureRedirect: "/login" }),
    (req, res) => {
        res.status(202).redirect("/loggedin");
    })
module.exports = router;