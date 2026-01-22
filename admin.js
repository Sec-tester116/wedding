document.addEventListener("DOMContentLoaded", () => {

  // 🔑 Supabase
  const SUPABASE_URL = "https://aoxhkobnpvjnqrbsjhcl.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveGhrb2JucHZqbnFyYnNqaGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODg2MTksImV4cCI6MjA4NDU2NDYxOX0.H6fIcKV5X4Vce66Xiz5HUKI49JNlF93BYQbNiFMWFx0";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  // 🔐 Password hash
  const ADMIN_PASSWORD_HASH =
    "29924ace8d6c8ae8001ca78eb7e0884d0b93bc446fa4c122c10b17f98e434ca1";

  // 🔐 Login
  window.login = async function () {
    const input = document.getElementById("password").value;

    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    if (hash !== ADMIN_PASSWORD_HASH) {
      alert("❌ كلمة المرور غير صحيحة");
      return;
    }

    document.getElementById("login").classList.add("hidden");
    document.getElementById("admin").classList.remove("hidden");

    loadMessages();
  };

  // 📥 Load messages
  window.loadMessages = async function () {
    const { data, error } = await supabase
      .from("messages")
      .select("message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("خطأ في تحميل الرسائل");
      return;
    }
    window.exportPDF = async function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  const { data, error } = await supabase
    .from("messages")
    .select("message")
    .order("created_at", { ascending: true });

  if (error || data.length === 0) {
    alert("لا توجد رسائل للتصدير");
    return;
  }

  let y = 20;

  doc.setFont("Times", "Normal");
  doc.setFontSize(14);
  doc.text("💍 رسائل أحبّتنا", 105, 10, { align: "center" });

  data.forEach((row, index) => {
    const text = `${index + 1}. ${row.message}`;

    const lines = doc.splitTextToSize(text, 170);
    if (y + lines.length * 7 > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(lines, 20, y);
    y += lines.length * 8;
  });

  doc.save("wedding-messages.pdf");
};

    const container = document.getElementById("messages");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "لا توجد رسائل بعد 🤍";
      return;
    }

    data.forEach((msg, index) => {
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `
        <div class="recipient">💌 رسالة رقم ${index + 1}</div>
        <div>${msg.message}</div>
        <small>${new Date(msg.created_at).toLocaleString("ar-SA")}</small>
      `;
      container.appendChild(div);
    });
  };

});
