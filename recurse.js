const taskInput = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const removeBtn = document.getElementById('remove-btn')
const allTasksContainer = document.getElementById('all-tasks-container')
let tasks = []
let draggedTaskIndex = null

// functions 
const renderTasks = () => {
  let taskList = ''
  for (let i = 0; i<tasks.length; i++) {
    taskList += `
      <div class="task-container" id="${tasks[i]}" draggable="true">
        <p class="task" id="${tasks[i]}-task">${tasks[i]}</p>
        <button class="task-remove-btn" data-remove="${tasks[i]}">&#215</button>
      </div>`
  }
  allTasksContainer.innerHTML = taskList

  const taskContainers = document.querySelectorAll('.task-container')
  taskContainers.forEach(container => { 
    container.addEventListener('dragstart', handleDragStart)
    container.addEventListener('dragover', handleDragOver)
    container.addEventListener('drop', handleDrop)
    container.addEventListener('dragend', handleDragEnd)
  })
}

const handleArrowBtnClick = () => {
  if (!taskInput.value) return
  if (tasks.includes(taskInput.value)) return

  tasks.push(taskInput.value)
  taskInput.value = ''

  // save tasks to local storage
  localStorage.setItem('recurse-tasks', JSON.stringify(tasks))
  renderTasks()
}

const handleTaskRemoveBtnClick = (taskId) => {
  const removedTaskDiv = document.getElementById(taskId)
  const removedTaskText = document.getElementById(`${taskId}-task`).textContent
  const removedTaskIndex = tasks.indexOf(removedTaskText)
  
  removedTaskDiv.classList.add('hidden')
  tasks.splice(removedTaskIndex,1)

  // setting local storage again so removed item is gone
  localStorage.setItem('recurse-tasks', JSON.stringify(tasks))
}

const handleDragStart = (e) => {
  draggedTaskIndex = tasks.indexOf(e.target.id)
  e.target.style.opacity = '0.5'
  e.target.style.cursor = 'grabbing'

}

const handleDragOver = (e) => {
  e.preventDefault()
}

const handleDrop = (e) => {
  e.preventDefault()

  const dropTargetElement = e.target.closest('.task-container')
  const dropTargetIndex = tasks.indexOf(dropTargetElement.id)

  const [draggedTask] = tasks.splice(draggedTaskIndex, 1) 
  tasks.splice(dropTargetIndex, 0, draggedTask)

  localStorage.setItem('recurse-tasks', JSON.stringify(tasks))
  renderTasks()
}

const handleDragEnd = (e) => {
  e.target.style.opacity = '1'
}

// get tasks from local storage
const tasksFromLocalStorage = JSON.parse(localStorage.getItem('recurse-tasks'))

if (tasksFromLocalStorage) {
  tasks = tasksFromLocalStorage
  renderTasks()
} 

// event listeners 
addBtn.addEventListener('click', handleArrowBtnClick)

taskInput.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') addBtn.click()
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





