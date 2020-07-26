document.querySelectorAll("#user-list tr").forEach((ele) => {
  ele.addEventListener("click", () => {
    let id = ele.querySelector("td").textContent;
    getComment(id);
  });
});

function getUser() {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      console.log(users);
      let tbody = document.querySelector("#user-list tbody");
      tbody.innerHTML = "";
      users.map((user) => {
        let row = document.createElement("tr");
        row.addEventListener("click", () => {
          getComment(user.id);
        });
        let td = document.createElement("td");
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.married ? "기혼" : "미혼";
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("GET", "/users");
  xhr.send();
}

function getComment(id) {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      let comments = JSON.parse(xhr.responseText);
      let tbody = document.querySelector("#comment-list tbody");
      tbody.innerHTML = "";
      comments.map((comment) => {
        let row = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = comment.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = comment.user.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = comment.comment;
        row.appendChild(td);
        let edit = document.createElement("button");
        edit.textContent = "수정";
        edit.addEventListener("click", () => {
          let newComment = prompt("바꿀 내용을 입력하세요");
          if (!newComment) {
            return alert("내용을 입력하세요!");
          }
          let xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open("PATCH", "/comments/" + comment.id);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify({comment: newComment}));
        });
        let remove = document.createElement("button");
        remove.textContent = "삭제";
        remove.addEventListener("click", () => {
          let xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open("DELETE", "/comments/" + comment.id);
          xhr.send();
        });
        td = document.createElement("td");
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement("td");
        td.appendChild(remove);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("GET", "/comments/" + id);
  xhr.send();
}

document.getElementById("user-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let name = event.target.username.value;
  let age = event.target.age.value;
  let married = event.target.married.checked;
  if (!name) {
    return alert("이름을 입력하세요");
  }
  if (!age) {
    return alert("나이를 입력하세요");
  }
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log("hi");
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("POST", "/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({name, age, married}));
  event.target.username.value = "";
  event.target.age.value = "";
  event.target.married.checked = false;
});

document.querySelector("#comment-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let id = event.target.userId.value;
  let comment = event.target.comment.value;
  if (!id) {
    return alert("아이디를 입력하세요");
  }
  if (!comment) {
    return alert("댓글을 입력하세요");
  }
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getComment(id);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("POST", "/comments");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({id, comment}));
  event.target.userId.value = "";
  event.target.comment.value = "";
});
