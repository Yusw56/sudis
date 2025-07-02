import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0Hk3yp2RgHd4skWhbQV_oqZxcVA0UuSk",
  authDomain: "yusuf-chat-bd02f.firebaseapp.com",
  databaseURL: "https://yusuf-chat-bd02f-default-rtdb.firebaseio.com",
  projectId: "yusuf-chat-bd02f",
  storageBucket: "yusuf-chat-bd02f.appspot.com",
  messagingSenderId: "136858198911",
  appId: "1:136858198911:web:d24831e6f5108fbb8fb04a",
  measurementId: "G-YJ8WXDW96G"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let nick = localStorage.getItem("nick");

function saveNick() {
  nick = document.getElementById("nick-input").value.trim();
  if (nick) {
    localStorage.setItem("nick", nick);
    document.getElementById("nick-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "block";
  }
}

window.saveNick = saveNick;

function sendMessage() {
  const message = document.getElementById("message-input").value.trim();
  if (message) {
    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      nick: nick,
      text: message,
      isAdmin: nick === "Yusuf"
    });
    document.getElementById("message-input").value = "";
  }
}

window.sendMessage = sendMessage;

const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.textContent = (msg.isAdmin ? "[ADMIN] " : "") + msg.nick + ": " + msg.text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Şifre kontrol fonksiyonu
function checkPassword() {

  const pw = document.getElementById("pww").value;
  if (pw === "wafeo") {
    document.getElementById("login-screen").style.display = "none";
    if (!nick) {
      document.getElementById("nick-screen").style.display = "block";
    } else {
      document.getElementById("chat-screen").style.display = "block";
    }
  } else {
    alert("Yanlış şifre");
  }
}

window.checkPassword = checkPassword;

// Sayfa yenilendiğinde her zaman şifre ekranı gelsin
window.onload = () => {
  document.getElementById("login-screen").style.display = "block";
  document.getElementById("nick-screen").style.display = "none";
  document.getElementById("chat-screen").style.display = "none";
};
window.checkPassword = checkPassword;
window.saveNick = saveNick;
window.sendMessage = sendMessage;
