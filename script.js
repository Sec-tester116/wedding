const SUPABASE_URL = "https://aoxhkobnpvjnqrbsjhcl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveGhrb2JucHZqbnFyYnNqaGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODg2MTksImV4cCI6MjA4NDU2NDYxOX0.H6fIcKV5X4Vce66Xiz5HUKI49JNlF93BYQbNiFMWFx0";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 🌐 Pages
const welcomePage = document.getElementById("welcome");
const messagePage = document.getElementById("messagePage");
const title = document.getElementById("title");
const messageInput = document.getElementById("message");

let selectedRecipient = "";

// 👉 Choose groom or bride
function choose(type) {
  selectedRecipient = type;
  welcomePage.classList.remove("active");
  messagePage.classList.add("active");

  title.innerText =
    type === "groom" ? "💙 Message to the Groom" : "💖 Message to the Bride";
}

// 🔙 Go back
function goBack() {
  messageInput.value = "";
  messagePage.classList.remove("active");
  welcomePage.classList.add("active");
}

// 📨 SEND MESSAGE (THIS IS STEP 6)
async function sendMessage() {
  const message = messageInput.value.trim();

  if (!message) {
    alert("Please write a message ❤️");
    return;
  }

  const { error } = await supabase
    .from("messages")
    .insert([
      {
        recipient: selectedRecipient,
        message: message
      }
    ]);

  if (error) {
    console.error(error);
    alert("❌ Error sending message");
  } else {
    alert("💖 Message sent successfully!");
    messageInput.value = "";
    goBack();
  }
}
