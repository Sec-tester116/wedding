document.addEventListener("DOMContentLoaded", () => {

  // 🔑 Supabase
  const SUPABASE_URL = "https://aoxhkobnpvjnqrbsjhcl.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveGhrb2JucHZqbnFyYnNqaGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODg2MTksImV4cCI6MjA4NDU2NDYxOX0.H6fIcKV5X4Vce66Xiz5HUKI49JNlF93BYQbNiFMWFx0";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  // 🔐 كلمة المرور (غيّرها)
  const ADMIN_PASSWORD_HASH = "29924ace8d6c8ae8001ca78eb7e0884d0b93bc446fa4c122c10b17f98e434ca1";

  // Login
  window.login = async function () {
  const input = document.getElementById("password").value;

  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  if (hash === ADMIN_PASSWORD_HASH) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("admin").classList.remove("hidden");
    loadMessages();
  } else {
    alert("❌ كلمة المرور غير صحيحة");
  }
};
  // Load messages
  window.loadMessages = async function () {
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
  };

});
