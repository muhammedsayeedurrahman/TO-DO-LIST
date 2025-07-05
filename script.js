
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
};


function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  addTaskToDOM(taskText, false);
  saveTasks();
  taskInput.value = '';
}


function addTaskToDOM(taskText, completed) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  taskList.appendChild(li);
}


function toggleTask(spanElement) {
  spanElement.parentElement.classList.toggle('completed');
  saveTasks();
}


function deleteTask(buttonElement) {
  buttonElement.parentElement.remove();
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
