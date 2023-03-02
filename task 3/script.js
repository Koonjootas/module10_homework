let btnSend = document.querySelector(".send");
let btnGeo = document.querySelector(".geo");
let input = document.querySelector(".message-place");
let output = document.querySelector(".chat-window");

console.log(btnSend);
console.log(btnGeo);
console.log(input);
console.log(output);

const wsUri = "wss://echo-ws-service.herokuapp.com/";

let websocket;

function writeToScreen(message, className, element) {
   let preUser = document.createElement(element);
   preUser.className = className;
   preUser.innerHTML = message;
   output.appendChild(preUser);
 }

 window.addEventListener("load", function(event) {
   console.log("All resources finished loading!");

   websocket = new WebSocket(wsUri);
   websocket.onopen = function(evt) {
       console.log("CONNECTED");
   };
   websocket.onclose = function(evt) {
       console.log("DISCONNECTED");
   };
   websocket.onmessage = function(evt) {
     writeToScreen(evt.data, "server", 'p');
   };
 });


 btnSend.addEventListener('click', () => {
   const message = input.value;
   if(message == ""){
   }else{
   console.log(message)
   writeToScreen(message, "user", 'p');
   websocket.send(message);
   input.value = "";
 }
 });
 
 btnGeo.addEventListener('click', () => {
   writeToScreen('Гео-локация', 'user', 'a');

   const success = (position) => {
     const latitude  = position.coords.latitude;
     const longitude = position.coords.longitude;

  console.log("latitude", latitude)
  console.log("longitude", longitude)


     let mapLink = document.querySelectorAll('a');

   mapLink.forEach(element => element.setAttribute("href", `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`));
   mapLink.forEach(element => element.setAttribute("target", "_blank"));
   }
     navigator.geolocation.getCurrentPosition(success);
   })