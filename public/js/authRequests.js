// import { showAlert } from "./showAlert";
import axios from "axios";
import { showAlert } from "./showAlert";


export const register = async(name, email, password, passwordConfirm) => {
    try {
        const user = await axios({
            method: "POST",
            url: "/api/user/signUp",
            data: {
                name,
                email,
                password,
                passwordConfirm,
            },
        });
        if (user.data.status === 'Success') {
            showAlert("success", "User Registered Successfully");
            setTimeout(() => { window.location = "/home"; }, 1500);
        }
    } catch (err) {
        console.log(err)
    }

}
export const login = async(email, password) => {
    try {
        const user = await axios({
            method: "POST",
            url: '/api/user/signIn',
            data: {
                email,
                password,
            }
        });

        if (user.data.status === 'Success') {
            showAlert("success", "User successfully logged in");
            setTimeout(() => {
                location.assign('/home');
            }, 1500);
        }
    } catch (err) {
        showAlert("error", err.response.data.message);
    }

}





// export const addNewsToDB = async(
//     title,
//     description,
//     url,
//     urlToImage,
//     publishDate
// ) => {
//     try {
//         const news = await axios({
//             method: "POST",
//             url: "/api/media/addNews",
//             data: {
//                 title,
//                 description,
//                 url,
//                 urlToImage,
//                 publishDate,
//             },
//         });
//         if (news.data.status === "Success") {
//             showAlert("success", "News added Successfully");
//             setTimeout(() => {
//                 window.location = "/news";
//             }, 1500);
//         }
//     } catch (err) {
//         showAlert("error", err.response.data.message);
//     }
// };
// export const getNews = async() => {
//     try {
//         const news = await axios({
//             method: "GET",
//             url: "/api/media/news",
//         });
//         if (news.data.status === "Success") {
//             showAlert("success", "News collected Successfully");
//             setTimeout(() => {
//                 window.location = "/news";
//             }, 1000);
//         }
//     } catch (err) {
//         showAlert("error", err.response.data.message);
//     }
// };