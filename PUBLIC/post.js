// ===============================
// LOAD POSTS ON PAGE LOAD
// ===============================
window.addEventListener("load", () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
        window.location.href = "login.html";
        return;
    }

    loadPosts();
});

// ===============================
// LOAD POSTS FUNCTION
// ===============================
async function loadPosts() {
    const user_id = localStorage.getItem("user_id");
    const container = document.getElementById("posts");
    container.innerHTML = ""; // clear old posts

    const res = await fetch(`/post/${user_id}`);
    const posts = await res.json();

    posts.forEach(post => {
        container.appendChild(renderPost(post));
    });
}

// ===============================
// RENDER A SINGLE POST
// ===============================
function renderPost(post) {
    const div = document.createElement("div");
    div.classList.add("post-item");

    div.innerHTML = `
        <input type="checkbox" class="post-check" data-id="${post.post_id}" ${post.completed ? "checked" : ""}>
        <span class="post-text ${post.completed ? "done" : ""}">
            ${post.content}
        </span>
    `;

    return div;
}

// ===============================
// CREATE NEW POST
// ===============================
const postForm = document.getElementById("postForm");

if (postForm) {
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user_id = localStorage.getItem("user_id");
        const content = document.getElementById("post-content").value.trim();

        if (!content) return;

        await fetch("/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, content })
        });

        document.getElementById("post-content").value = "";
        loadPosts(); // refresh list
    });
}

// ===============================
// HANDLE CHECKBOX UPDATES
// ===============================
document.addEventListener("change", async (e) => {
    if (e.target.classList.contains("post-check")) {
        const id = e.target.dataset.id;
        const completed = e.target.checked;

        await fetch(`/post/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        });

        loadPosts(); // refresh UI
    }
});
