const userList = document.getElementById("userList");
const userPosts = document.getElementById("userPosts");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.name;
      li.addEventListener("click", () => handleUserClick(user.id, user.name));
      userList.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    userList.innerHTML = "<li>Lỗi khi tải người dùng.</li>";
  });

async function handleUserClick(userId, userName) {
  // Bỏ active tất cả
  const allUsers = document.querySelectorAll("#userList li");
  allUsers.forEach(user => user.classList.remove("active"));

  const clickedItem = Array.from(allUsers).find(li => li.textContent === userName);
  if (clickedItem) clickedItem.classList.add("active");

  userPosts.innerHTML = `<p> Đang tải bài viết...</p>`;
  await delay(1500);

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(posts => {
      if (posts.length === 0) {
        userPosts.innerHTML = `<p>${userName} chưa có bài viết nào.</p>`;
        return;
      }

      let html = `<h3> Bài viết của ${userName}:</h3><ul class="posts">`;
      posts.forEach(post => {
        html += `<li>${post.title}</li>`;
      });
      html += "</ul>";
      userPosts.innerHTML = html;
    })
    .catch(error => {
      console.error("Lỗi khi lấy bài viết:", error);
      userPosts.innerHTML = `<p>Lỗi khi tải bài viết.</p>`;
    });
}
