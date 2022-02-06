const {Router} = require("express");
const router = Router();

router.post("/", (req, res)=>{
    req.session.destroy((err)=>{
        if(!err)
            res.redirect("/login");
    })
})

module.exports = router;