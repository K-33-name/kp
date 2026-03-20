const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch("/addUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    loadUsers();
});

async function loadUsers() {
    const res = await fetch("/users");
    const data = await res.json();

    list.innerHTML = "";
    data.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        list.appendChild(li);
    });
}

loadUsers();