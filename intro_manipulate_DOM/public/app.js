const form = document.getElementById("user-form");
const tbody = document.querySelector("#user-table tbody");

// Load users from backend
async function loadUsers() {
  const res = await fetch("/api/users");
  const users = await res.json();

  tbody.innerHTML = "";

  for (const u of users) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.name}</td>
      <td>${u.phone}</td>
      <td>${u.address}</td>
      <td><span class="pill">${u.gender}</span></td>
      <td>${u.age}</td>
      <td>${u.username}</td>
      <td><span class="pill ok">••••••••</span></td>
    `;
    tbody.appendChild(tr);
  }
}

// Submit form using fetch
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    alert("Failed to save user");
    return;
  }

  form.reset();
  loadUsers();
});

// Load users when page loads
loadUsers();
