const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = wrapper.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i")

const apikey= '25952a3d8cc6de4ebc4d984733662538';
let api;
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});
locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Ypur browser not support geolocation api");
    }
});
function onSuccess(position){
    const{latitude,longitude } = position.coords;
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
    fechData();
};

function onError(error){
    infoText.innerText = "User denaid Geolocation...";
    infoText.classList.add("error");
};
function requestApi(city){
   
   api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
   fechData();

};
function fechData(){
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("peding");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
};

function weatherDetails(info){
    infoText.classList.replace("peding", "error");
    if(info.cod == "404"){
        infoText.innerText = `${inputField.value} ist a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const{description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if (id == 800) {
            wIcon.src = 'Icons/clear.svg'
            
        }else if (id >= 200 && id <= 232) {
            wIcon.src = 'Icons/storm.svg'
            
        }
        else if (id >= 600 && id <= 622) {
            wIcon.src = 'Icons/snow.svg'
            
        }
        else if (id >= 701 && id <= 781) {
            wIcon.src = 'Icons/haze.svg'
            
        }
        else if (id >= 801 && id <= 804) {
            wIcon.src = 'Icons/cloud.svg'
            
        }
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            wIcon.src = 'Icons/rain.svg'
            
        }



        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText= `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoText.classList.remove("peding", "error");
        wrapper.classList.add("activate");
    }
    
};

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("activate");
} );