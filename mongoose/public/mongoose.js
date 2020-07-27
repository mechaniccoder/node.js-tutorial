document.querySelectorAll("#user-list tr").forEach((ele) => {
  ele.addEventListener("click", () => {
    console.log("클릭");
    let id = ele.querySelector("td").textContent;
    getComment(id); // 호이스팅
  });
});

// 사용자 ajax
function getUser() {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      let tbody = document.querySelector("#user-list tbody");
      tbody.innerHTML = "";
      users.map((user) => {
        let row = document.createElement("tr");
        row.addEventListener("click", () => {
          getComment(user._id);
        });

        let td = document.createElement("td");
        td.textContent = user._id;
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
        td.textContent = comment._id;
        row.appendChild(td);

        td = document.createElement("td");
        td.textContent = comment.commenter.name;
        row.appendChild(td);

        td = document.createElement("td");
        td.textContent = comment.comment;
        row.appendChild(td);

        let edit = document.createElement("button");
        edit.textContent = "수정";
        edit.addEventListener("click", () => {
          let newComment = prompt("수정할 내용을 입력하세요.");
          if (!newComment) {
            return alert("내용을 입력하지 않았습니다.");
          }
          let xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            }
          };
          xhr.open("PATCH", "/comments/" + comment._id);
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
          xhr.open("DELETE", "/comments/" + comment._id);
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

// user-form
document.querySelector("#user-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = e.target.username.value;
  let age = e.target.age.value;
  let married = e.target.married.checked;

  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("POST", "/users");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({name, age, married}));

  e.target.username.value = "";
  e.target.age.value = "";
  e.target.married.checked = false;
});

// comment-form
document.querySelector("#comment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let userId = e.target.userid.value;
  let comment = e.target.comment.value;
  if (!userId) {
    return alert("아이디를 입력하세요");
  }
  if (!comment) {
    return alert("댓글을 입력하세요");
  }

  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      getComment(userId);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("POST", "/comments");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({id: userId, comment}));

  e.target.userid.value = "";
  e.target.comment.value = "";
});
