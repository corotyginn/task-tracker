const form = document.getElementById("task-form");
const list = document.getElementById("task-list");
const filterButtons = document.querySelectorAll("#filters button");

let allTasks = [];
let currentFilter = "all";

async function fetchTasks() {
    const res = await fetch("/tasks");
    allTasks = await res.json();
    render();
}

function render() {
    let filtered = allTasks;
    if (currentFilter === "active") {
        filtered = allTasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filtered = allTasks.filter(t => t.completed);
    }

    if (filtered.length === 0) {
        list.innerHTML = `<li class="empty">Нет задач</li>`;
        return;
    }

    list.innerHTML = filtered
        .map(
            t => `
        <li class="${t.completed ? "done" : ""}">
            <label>
                <input type="checkbox" ${t.completed ? "checked" : ""} data-id="${t.id}">
                <span>${escapeHtml(t.title)}</span>
            </label>
            <span class="badge">${escapeHtml(t.category)}</span>
            <button class="delete" data-id="${t.id}">✕</button>
        </li>`
        )
        .join("");

    list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener("change", async () => {
            await fetch(`/tasks/${cb.dataset.id}`, { method: "PATCH" });
            fetchTasks();
        });
    });

    list.querySelectorAll("button.delete").forEach(btn => {
        btn.addEventListener("click", async () => {
            await fetch(`/tasks/${btn.dataset.id}`, { method: "DELETE" });
            fetchTasks();
        });
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;"
    })[c]);
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    if (!title) return;

    await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category })
    });

    form.reset();
    document.getElementById("category").value = "личное";
    fetchTasks();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.toggle("active", b === btn));
        render();
    });
});

fetchTasks();
