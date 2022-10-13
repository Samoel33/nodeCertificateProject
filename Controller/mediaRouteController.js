const News = require('../models/addNews');


module.exports.getNews = async(req, res, next) => {
    try {
        const news = await News.find().sort({ date: -1 });
        if (news) {
            res.status(200).json({
                status: 'Success',
                message: "News successfully collected",
                data: {
                    news
                }
            })
        } else {
            res.status(400).json({
                status: 'Fail',
                message: "Fail to get the News",
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
        })
    }
}
module.exports.addNews = async(req, res, next) => {
    try {
        const news = await News.create(req.body);
        if (news) {
            res.status(201).json({
                status: "Success",
                message: "News added sucessfully, you will be redirected to home",
                data: {
                    news
                }
            });
        } else {
            res.status(400).json({
                message: 'Something went wrong, Please try again',
            })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports.updateNews = async(req, res, next) => {
    try {
        const filter = req.params.id;
        const updates = req.body;
        const news = await News.findByIdAndUpdate(filter, updates, { new: true });
        if (!news) {
            res.status(400).json({
                status: "Fail",
                message: 'Something went wrong, Please try again',

            })
        }
        res.status(200).json({
            status: "Success",
            message: 'News added sucessfully, you will be redirected to home',
            data: news,
        })

    } catch (err) {
        console.log(err);
    }
}
module.exports.deleteNews = async(req, res, next) => {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            res.status(404).json({
                status: 'fail',
                message: 'News not found',
                data: null
            })
        }
        res.status(203).json({
            status: 'Success',
            message: 'Deleted Succesfully',
            data: null

        });

    }
    // module.exports.editNews = async(req, res, next) => {
    //     console.log(req)
    //     console.log(req.params.id, 'i am coming here guys');
    //     if (!news) {
    //         res.status(404).json({
    //             status: 'fail',
    //             message: 'News not found',
    //             data: null
    //         })
    //     }
    //     res.status(200).json({
    //         status: 'Success',
    //         message: 'Collected for Edit',
    //         data: news

//     });

// }