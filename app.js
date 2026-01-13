const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function Tasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div class="task-left">
        <span class="task-title">${task.title}</span>
        <span class="task-status">${task.completed ? "Completed" : "Pending"}</span>
      </div>
      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleTask(${task.id})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });


  clearAllBtn.style.display = tasks.length > 0 ? 'block' : 'none';
}


function addTask() {
  const title = taskInput.value.trim();

  if (title === "") return;

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  Tasks();

  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  Tasks();
}


function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  Tasks();
}


function clearAllTasks() {
  tasks = [];
  saveTasks();
  Tasks();
}


addBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);


taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});


Tasks();
