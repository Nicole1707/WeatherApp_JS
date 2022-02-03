const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input");


inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
})

function requestApi(city){
    const apikey= '25952a3d8cc6de4ebc4d984733662538';
   let api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//    fetch(api).then(response => console.log(response);)

}