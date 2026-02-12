const form = document.getElementById("user-form");
const tbody = document.querySelector("#user-table tbody");
//backend stufffffffer38r3r
async function loadUsers() { //retrives from backend
  const res = await fetch("/api/users"); //fetches
  const users = await res.json(); //becomes json

  tbody.innerHTML = "";

  for (const u of users) {
    const tr = document.createElement("tr"); //create new row for every users
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
form.addEventListener("submit", async (e) => { //listens for add record
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("/api/users", { //sends to backend
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) { //check if worked
    alert("Failedto save user");
    return;
  }

  form.reset();
  loadUsers();
});

// Loaduser when lods
loadUsers();
