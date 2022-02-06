const { Router } = require(`express`);
const passport = require("passport");
const router = Router();
const User = require("../schema/user")

router.use((req, res, next)=>{
    if(req.user)
        next();
    else
        res.redirect("/login");
})
router.get("/",
    (req, res) => {
        res.render("loggedin.ejs");
    }
);
module.exports = router;