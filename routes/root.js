const router = require("express").Router();

router.use((req, res, next) => {
    if (req.user)
        res.redirect("/loggedin");
    else
        next();
});
router.get("/", (req, res) => {
    res.render("root.ejs");
})
module.exports = router;