// 🔑 Supabase
const SUPABASE_URL = "https://aoxhkobnpvjnqrbsjhcl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveGhrb2JucHZqbnFyYnNqaGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODg2MTksImV4cCI6MjA4NDU2NDYxOX0.H6fIcKV5X4Vce66Xiz5HUKI49JNlF93BYQbNiFMWFx0";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 🔐 Password (غيرها)
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

// Login
function login() {
  const input = document.getElementById("password").value;

  if (input === ADMIN_PASSWORD) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("admin").classList.remove("hidden");
    loadMessages();
  } else {
    alert("❌ كلمة المرور غير صحيحة");
  }
}

// Load messages
async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("خطأ في تحميل الرسائل");
    console.error(error);
    return;
  }

  const container = document.getElementById("messages");
  container.innerHTML = "";

  data.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `
      <div class="recipient">
        ${msg.recipient === "bride" ? "💖 العروس" : "💙 العريس"}
      </div>
      <div>${msg.message}</div>
    `;
    container.appendChild(div);
  });
}
