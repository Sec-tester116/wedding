let chosen = "";

function choose(who) {
  chosen = who;
  document.getElementById("welcome").classList.remove("active");
  document.getElementById("messagePage").classList.add("active");

  document.getElementById("title").innerText =
    who === "groom"
      ? "💙 Message to the Groom"
      : "💖 Message to the Bride";
}

function goBack() {
  document.getElementById("messagePage").classList.remove("active");
  document.getElementById("welcome").classList.add("active");
}

function sendMessage() {
  const msg = document.getElementById("message").value;

  if (!msg.trim()) {
    alert("Please write a message");
    return;
  }

  alert("Message sent ❤️ (for now)");

  document.getElementById("message").value = "";
  goBack();
}