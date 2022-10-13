import axios from "axios";
import { showAlert } from "./showAlert";
import { login, register } from "./authRequests";
import $ from "jquery";
import { editNewsApi, addNewsToDB, getNews, editNews } from "./media";
import { sendMessage, setName, typing } from "./chat";
import { io } from "socket.io-client";
const dt = require("datatables.net")();
const socket = io.connect("http://localhost:3004", {
    reconnect: true,
    transports: ["websocket"],
});
const chatGroup = io.connect('/chatForm', { reconnect: true, transports: ['websocket'] });

if (location.pathname.includes("/home")) {
    const tempe = document.querySelector('.temp');
    const country = document.querySelector('.country');
    window.onload = async() => {
        await navigator.geolocation.getCurrentPosition(async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = process.env.WEATHER_API_KEY;
            try {
                const data = await axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`,
                );
                tempe.innerHTML = ` temp: ${(data.data.current.temp / 10).toFixed(
              2
            )}  &#8451;`;
                country.innerHTML = `Country: ${data.data.timezone.substring(data.data.timezone.indexOf('/') + 1)}`
            } catch (err) {
                if (err.message === "Request failed with status code 401") {
                    document.querySelector('.weatherData').innerHTML = "Error Fetching Weather data"
                }
            }
        });
    };
}
const registerForm = document.querySelector(".registerForm");
const loginForm = document.querySelector(".loginForm");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.querySelector(".name").value;
        const email = document.querySelector(".email").value;
        const password = document.querySelector(".password").value;
        const passwordConfirm = document.querySelector(".passwordConfirm").value;
        register(name, email, password, passwordConfirm);
    });
}
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector(".email").value;
        const password = document.querySelector(".password").value;
        login(email, password);
    });
}
//MEDIA Requests
const addNewsForm = document.querySelector(".addNews");
const getNewsData = document.querySelector(".getNews");
const deleteNews = document.querySelectorAll(' .btn-group .delete');
const editNewsEvent = document.querySelectorAll(".editNews");
const editNewsForm = document.querySelector('.editNewsForm');
if (addNewsForm) {
    addNewsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const url = document.querySelector("#url").value;
        const urlToImage = document.querySelector("#url-image").value;
        const publishDate = document.querySelector("#publishedAt").value;

        addNewsToDB(title, description, url, urlToImage, publishDate);
    });
}
if (getNewsData) {
    getNewsData.addEventListener("click", () => {
        getNews();
    });
}
if (deleteNews) {
    deleteNews.forEach(deletebtn => {
        deletebtn.addEventListener("click", async(e) => {
            console.log('deleting', e.target.accessKey)
            const deletedNews = await axios({
                method: "DELETE",
                url: `/api/media/news/${e.target.accessKey}`,
            });
            console.log(deletedNews.data.status);
            if (deletedNews.data.status === "Success") {
                showAlert("success", "News Deleted successfully");
                setTimeout(() => {
                    location.reload(true);
                }, 1500);
            }
        })
    });
}
if (editNewsEvent) {
    editNewsEvent.forEach((edit) => {
        edit.addEventListener("click", async(e) => {
            const newsId = e.target.accessKey;
            editNewsApi(newsId);
        })
    })
}
if (editNewsForm) {
    editNewsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newsEditedData = {
            title: document.querySelector('#title').value,
            description: document.querySelector('#description').value,
            url: document.querySelector('#url').value,
            urlToImage: document.querySelector('#url-image').value,
            publishedAt: document.querySelector('#publishedAt').value,
        }
        editNews(document.querySelector('.editNewsBtn').value, newsEditedData);
    })
}



//GROUP chat
if (location.pathname.includes("/chatForm")) {
    const buttonSend = document.querySelector(".btn");
    const inputMessage = document.querySelector(".message");
    const inputName = document.querySelector(".name");
    const container = document.querySelector(".chat");
    const localUser = document.querySelector(".localUser");
    const chatButton = document.querySelector(".chatbutton");

    chatButton.style.display = "none";


    socket.on('connection', () => {
        alert('connected')
    });
    socket.on('connection_error', (err) => {
        console.log(err)
    });
    console.log('after connections');

    socket.on("connection", () => {
        //establish connection using cdn socket io
        console.log("connetion established");
    });

    socket.on('connect_error', (err) => {
        console.log('connection bad: ', err.message);
    })
    socket.on("message", (data) => {
        //to display on the screeen
        document.querySelector('.feedback').innerHTML = "";
        const name = document.createElement("h3");
        const message = document.createElement("p");
        const time = document.createElement("span");
        const chat = document.createElement("div");
        name.innerHTML = `Name:${data.name}`;
        message.innerHTML = `Message:${data.message}`;
        time.innerHTML = `time:${data.time}`;
        chat.append(name, time, message);
        chat.classList.add("card");
        localUser.appendChild(chat);
    });

    socket.on('typing', (data) => {
        document.querySelector('.feedback').innerHTML = `${data} is typing`
    })
    if (inputMessage.value !== "") {
        buttonSend.addEventListener("click", () => {
            setName(inputName.value);
            sendMessage(inputMessage.value);
            inputMessage.value = "";
        });
    }
    inputMessage.addEventListener('keypress', () => {
        typing(inputName.value);
    })
}

if (location.pathname.includes("/news")) {
    $(function() {
        $("#table_id").dataTable();
    });
}