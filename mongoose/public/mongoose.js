document.querySelectorAll("#user-list tr").forEach((ele) => {
  ele.addEventListener("click", () => {
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
  xhr.onload = () => {};
  xhr.open("GET");
  xhr.send();
}
