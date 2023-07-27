
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const categoryFilter = document.getElementById('categoryFilter');
let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categoryFilter.value;

  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      category: category,
      completed: false,
    };
    tasks.push(task);
    saveTasksToLocalStorage();
    renderTasks();
    taskInput.value = '';
  }
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleTaskStatus(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveTasksToLocalStorage();
  renderTasks();
}

function editTask(id, newText) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, text: newText };
    }
    return task;
  });
  saveTasksToLocalStorage();
  renderTasks();
}

function filterTasksByCategory() {
  const category = categoryFilter.value;
  if (category === 'all') {
    renderTasks();
  } else {
    const filteredTasks = tasks.filter(task => task.category === category);
    renderTasks(filteredTasks);
  }
}

function renderTasks(tasksToRender = tasks) {
  taskList.innerHTML = '';

  tasksToRender.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
      <span contenteditable="true" onblur="editTask(${task.id}, this.innerText)" ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.text}</span>
      <button onclick="removeTask(${task.id})">Remove</button>
    `;
    taskList.appendChild(taskItem);
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

loadTasksFromLocalStorage();
renderTasks();
