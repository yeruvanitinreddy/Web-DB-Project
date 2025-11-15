document.querySelector("form").addEventListener("submit", createPost);

function createPost(event) {
  event.preventDefault();

  const post = {
    content: document.getElementById("post-content").value
  };

  console.log("New Post:", post);
}
