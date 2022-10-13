const News = require('../models/addNews');
module.exports.getLoginForm = (req, res, next) => {
    res.render("login", { title: "Login" });
};
module.exports.getRegisterForm = (req, res, next) => {
    res.render("register", { title: "Register" });
};
module.exports.getRedirect = async(req, res) => {
    res.redirect("/login");
};
module.exports.getHome = async(req, res) => {
    try {
        //  const news = getNews();
        const latestnews = await News.find().sort({ date: -1 });
        const news = latestnews.slice(0, 3);
        res.render("home", { news, title: 'Home' });
    } catch (err) {
        console.log(err);
    }
};
module.exports.getSports = async(req, res, next) => {
    res.render("sports", { title: 'Sports' });
};

module.exports.getContactUs = (req, res, next) => {
    res.render("contactUs", { title: 'Contact Us' });
};
module.exports.getAboutUs = (req, res, next) => {
    res.render("aboutUs", { title: 'About Us' });
};
module.exports.getaddNewsForm = async(req, res, next) => {
    res.render("addNews", { title: "Add News" });
};
module.exports.getNews = async(req, res, next) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.render('editNews', { news, title: 'Edit/Delete News' });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: "couldn't get you data",
        })
    }
};

module.exports.getChatForm = (req, res, next) => {
    res.render('chatBox', { title: 'Group Chat' });
}

module.exports.getEditNews = async(req, res, next) => {
    console.log(req.params.id);
    const news = await News.findById(req.params.id);
    res.render('editNewsPatch', { news, title: 'Edit News' });
}