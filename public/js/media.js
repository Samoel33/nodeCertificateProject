import axios from "axios";
import { showAlert } from "./showAlert";

export const addNewsToDB = async(
    title,
    description,
    url,
    urlToImage,
    publishDate
) => {
    try {
        const news = await axios({
            method: "POST",
            url: "/api/media/addNews",
            data: {
                title,
                description,
                url,
                urlToImage,
                publishDate,
            },
        });
        if (news.data.status === "Success") {
            showAlert("success", "News successfully added, You now be redirected to News page");
            setTimeout(() => {
                window.location = "/news";
            }, 1000);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
};
export const getNews = async() => {
    try {
        const news = await axios({
            method: "GET",
            url: "/api/media/news",
        });
        if (news.data.status === "Success") {
            window.location = "/news";
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }
};
export const editNewsApi = async(newsId) => {
    try {
        if (!newsId) {
            console.log('newsID not string')
        }
        console.log('you')
        const news = await axios({
            method: 'GET',
            url: `/news/${newsId}`,
        });

        if (news.status = 200) {
            window.location = `/news/${newsId}`;
        }
    } catch (err) {
        console.log(err);
        //showAlert('error', err.response.data.message);
    }
}
export const editNews = async(id, newsDataEdited) => {
    try {
        console.log(id, newsDataEdited);
        const news = await axios({
            method: 'PATCH',
            url: `/api/media/news/${id}`,
            data: newsDataEdited,
        })
        if (news.data.status === "Success") {
            showAlert("success", "Updated the News successfully");
            setTimeout(() => {
                window.location = "/news";
            }, 1000);
        }
    } catch (err) {
        showAlert('error', 'Could not update the news')
    }
}