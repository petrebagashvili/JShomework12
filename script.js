const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTask = document.getElementById("addTask");
const StorageKey = 'tasks';

const saveTasks = () => {
  const tasks = [taskList].map(task => ({
    description: task.querySelector('span').textContent,
    completed: task.classList.contains('completed'),
  }));
  localStorage.setItem(StorageKey, JSON.stringify(tasks));
};

const renderTask = ({ description, completed }) => {
  const task = document.createElement("div");
  task.className = `task ${completed ? "completed" : "isn't completed"}`;

  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = description;
  if (completed) {
    taskTextSpan.style.textDecoration = "line-through";
    taskTextSpan.style.color = "grey";
  }

  const completeButton = document.createElement("button");
  completeButton.textContent = completed ? "Completed" : "Complete";
  completeButton.className = 'completebtn';
  completeButton.style.backgroundColor = completed ? "lightgreen" : "";
  completeButton.style.color = completed ? "white" : "";
  completeButton.addEventListener("click", () => {
    task.classList.toggle("completed");
    if (task.classList.contains("completed")) {
      taskTextSpan.style.textDecoration = "line-through";
      taskTextSpan.style.color = "grey";
      completeButton.style.backgroundColor = "lightgreen";
      completeButton.style.color = "white";
      completeButton.textContent = "Completed";
    } else {
      taskTextSpan.style.textDecoration = "none";
      taskTextSpan.style.color = "black";
      completeButton.style.backgroundColor = "";
      completeButton.style.color = "";
      completeButton.textContent = "Complete";
    }
    saveTasks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(task);
    saveTasks();
  });

  task.appendChild(taskTextSpan);
  task.appendChild(completeButton);
  task.appendChild(deleteButton);
  taskList.appendChild(task);
};

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem(StorageKey)) ;
  tasks.forEach(renderTask);
};

addTask.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  renderTask({ description: taskText, completed: false });
  saveTasks();
  taskInput.value = ""; 
});

