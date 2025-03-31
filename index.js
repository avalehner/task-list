const choreInput = document.getElementById('chore-input')
const addBtn = document.getElementById('add-btn')
const removeBtn = document.getElementById('remove-btn')
const AllChoresContainer = document.getElementById('all-chores-container')
let chores = []

// get chores from local storage
const choresFromLocalStorage = JSON.parse(localStorage.getItem('chores'))

if (choresFromLocalStorage) {
  chores = choresFromLocalStorage
  renderChores()
} 

// event listeners 
addBtn.addEventListener('click', () => {
  if (!choreInput.value) return
  if (chores.includes(choreInput.value)) return

  chores.push(choreInput.value)
  choreInput.value = ''

  // save chores to local storage
  localStorage.setItem('chores', JSON.stringify(chores))
  renderChores()
})

removeBtn.addEventListener('click', () => {
  AllChoresContainer.innerHTML = ''
  chores = []
  localStorage.clear()
})

document.addEventListener('click', (e) => {
  if(e.target.dataset.remove){
    handleChoreRemoveBtnClick(e.target.dataset.remove)
  }
})

// functions 

function renderChores() {
  let choreList = ''
  for (let i = 0; i<chores.length; i++) {
    choreList += `
      <div class='chore-container' id='${chores[i]}'>
        <p class='chore' id='${chores[i]}-chore'>${chores[i]}</p>
        <button class='chore-remove-btn' data-remove='${chores[i]}'>&#215</button>
      </div>`
  }
  AllChoresContainer.innerHTML = choreList
}

function handleChoreRemoveBtnClick(choreId) {
  const removedChoreDiv = document.getElementById(choreId)
  const removedChoreText = document.getElementById(`${choreId}-chore`)
  const removedChoreIndex = chores.indexOf(removedChoreText)
  
  removedChoreDiv.classList.add('hidden')
  chores.splice(removedChoreIndex,1)
}





