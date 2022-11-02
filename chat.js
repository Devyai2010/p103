// Your web app's Firebase configuration
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
    apiKey: "AIzaSyCo2a6Oxzwew78ZGh4s4dewiqGJ-r4h-8o",
    authDomain: "social-website-7989f.firebaseapp.com",
    databaseURL: "https://social-website-7989f-default-rtdb.firebaseio.com",
    projectId: "social-website-7989f",
    storageBucket: "social-website-7989f.appspot.com",
    messagingSenderId: "508191653576",
    appId: "1:508191653576:web:2e2a5f80b41843f4b56ffd"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

// Initialize Firebase


function addUser()
{
    user_name = document.getElementById("user_name").value;
    firebase.database().ref("/").child(user_name).update({
        purpose : "adding user"
    });
    
    localStorage.setItem("user_name", user_name);

    window.location = "chat_room.html";
    
}

user_name = localStorage.getItem("user_name");
 room_name = localStorage.getItem("room_name");
 
function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
});

document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { 
        firebase_message_id = childKey;
         message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message=message_data['message'];
like = message_data['like'];
name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
 message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
   span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

   row = name_with_tag + message_with_tag + like_button;
   document.getElementById("output").innerHTML+= row;

    } }); }); } getData();

function logout()
 { 
    localStorage.removeItem("user_name");
 localStorage.removeItem("room_name");
  window.location = "index.html";
 }


