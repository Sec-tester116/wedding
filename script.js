const SUPABASE_URL = "https://aoxhkobnpvjnqrbsjhcl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveGhrb2JucHZqbnFyYnNqaGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODg2MTksImV4cCI6MjA4NDU2NDYxOX0.H6fIcKV5X4Vce66Xiz5HUKI49JNlF93BYQbNiFMWFx0";

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

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
