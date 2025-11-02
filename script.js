function openFeactures() {
  let allElems = document.querySelectorAll(".elem");
  let allfullElems = document.querySelectorAll(".fullElem");
  let allfullElemsBackbtn = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allfullElems[elem.id].style.display = "block";
    });
  });

  allfullElemsBackbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allfullElems[back.id].style.display = "none";
    });
  });
}
openFeactures();

function taskList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDeatilsInput = document.querySelector(".addTask form textarea");
  let taskCheckBox = document.querySelector(".addTask form #check");

  let currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task List is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTasks");
    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
              <h5>${elem.task} <span class="${elem.imp}">imp</span></h5>
              <button id=${idx}>Mark As Completed</button>
            </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach((btn) => {
      btn.onclick = () => {
        let id = btn.dataset.id;
        currentTask.splice(id, 1);
        renderTask();
      };
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDeatilsInput.value,
      imp: taskCheckBox.checked,
    });
    renderTask();
  });
  let markCompleted = document.querySelectorAll(".task button");
  markCompleted.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentTask.splice(btn.id, 1);
      renderTask();
    });
  });
}
taskList();
