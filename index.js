const taskInput = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const removeBtn = document.getElementById('remove-btn')
const allTasksContainer = document.getElementById('all-tasks-container')
let tasks = []

// get tasks from local storage
const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

if (tasksFromLocalStorage) {
  tasks = tasksFromLocalStorage
  renderTasks()
} 

// event listeners 
addBtn.addEventListener('click', () => {
  if (!taskInput.value) return
  if (tasks.includes(taskInput.value)) return

  tasks.push(taskInput.value)
  taskInput.value = ''

  // save tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks))
  renderTasks()
})

removeBtn.addEventListener('click', () => {
  allTasksContainer.innerHTML = ''
  tasks = []
  localStorage.clear()
})

document.addEventListener('click', (e) => {
  if(e.target.dataset.remove){
    handleTaskRemoveBtnClick(e.target.dataset.remove)
  }
})

// functions 

function renderTasks() {
  let taskList = ''
  for (let i = 0; i<tasks.length; i++) {
    taskList += `
      <div class='task-container' id='${tasks[i]}'>
        <p class='task' id='${tasks[i]}-task'>${tasks[i]}</p>
        <button class='task-remove-btn' data-remove='${tasks[i]}'>&#215</button>
      </div>`
  }
  allTasksContainer.innerHTML = taskList
}

function handleTaskRemoveBtnClick(taskId) {
  const removedTaskDiv = document.getElementById(taskId)
  const removedTaskText = document.getElementById(`${taskId}-task`).textContent
  const removedTaskIndex = tasks.indexOf(removedTaskText)
  
  removedTaskDiv.classList.add('hidden')
  tasks.splice(removedTaskIndex,1)

  // setting local storage again so removed item is gone
  localStorage.setItem('tasks', JSON.stringify(tasks))
}





