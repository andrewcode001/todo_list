// Category related selectors
const categoryForm = document.querySelector('[data-category-form]')
const categoryList = document.querySelector('[data-category-list]')
const categoryInput = document.querySelector('.input-category')
const removeCategoryBtn = document.querySelector('.btn-remove-category')

// Task related selectors
const taskCountContainer = document.querySelector('.tasks-count')
const taskCounter = document.querySelector('[data-tasks-count]')
const taskPlural = document.querySelector('[data-task-plural')
const tasksList = document.querySelector('[data-tasks-list]')
const taskForm = document.querySelector('[data-tasks-form]')
const taskInput = document.querySelector('.input-task')
const removeTaskBtn = document.querySelector('.btn-remove-task')

// Local Storage Setup - create unique namespace
const LOCAL_STORAGE_CATEGORY_KEY = 'category.objects'
const LOCAL_STORAGE_SELECTED_CATEGORY_KEY = 'category.selectedCategoryId'
const LOCAL_STORAGE_SELECTED_TASK_KEY = 'category.selectedTaskId'
let categoryObjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || []
let selectedCategoryId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CATEGORY_KEY)
let selectedTaskId = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK_KEY)

// Event Listeners
categoryForm.addEventListener("submit", e => {
    e.preventDefault()
    // if input is NULL, return and do not run program
    if(inputChecker(categoryInput.value)) return

    // Main application logic starts here...
    const inputCategory = createCategoryObject(categoryInput)
    categoryObjects.push(inputCategory)
    categoryInput.value = null
    console.log(categoryObjects)

    // Save any inputs into local storage then renderOrganizer() is invoked
    saveLocalStorage()
    renderOrganizer()
    // saveLocalStorage()
})

categoryList.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase()=== 'li'){
        // the click will extract the categoryId, then saves to local storage, re-renders with associated category highlighted
        selectedCategoryId = e.target.dataset.categoryId
        saveLocalStorage()
        
        renderOrganizer()
    }
})


removeCategoryBtn.addEventListener("click", e => {
    let selectedCategory = categoryObjects.find( category => category.categoryId === selectedCategoryId)
    // LEFT OFF HERE // task removal complete
    categoryObjects = categoryObjects.filter( category => category.categoryId !== selectedCategoryId)
    selectedCategoryId = null
    saveLocalStorage()
    clearContent(tasksList)
    updateTasksHeaderWording(selectedCategory)
    renderOrganizer()

})

tasksList.addEventListener("click", e =>{
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedTaskId = e.target.dataset.taskId
        saveLocalStorage()
        console.log(selectedTaskId)
    }
})

taskForm.addEventListener("submit", e => {
    e.preventDefault()
    if(inputChecker(taskInput.value)) return
    const task = taskInput.value
    let selectedCategory = categoryObjects.find( category => category.categoryId === selectedCategoryId)
    const taskObject = createTaskObject(task)
    selectedCategory.tasks.push(taskObject)
    taskInput.value = null
    saveLocalStorage()
    renderOrganizer()
    console.log(selectedCategory.tasks)
})

removeTaskBtn.addEventListener("click", e => {
    if(!selectedTaskId){
        console.log('no task selected')
    } else {
        let selectedCategory = categoryObjects.find( category => category.categoryId === selectedCategoryId)
        console.log(selectedCategory)
        selectedCategory.tasks = selectedCategory.tasks.filter(task => task.taskId !== selectedTaskId)
        selectedTaskId = null
        saveLocalStorage()
        updateTasksHeaderWording(selectedCategory)
        renderTasksList(selectedCategory)
    }
})

// Main Functions

function renderOrganizer(){
    clearContent(categoryList)
    renderCategoryList()
    // This will access the selectedCategory based on the clicked selectedCategoryId local storage variable
    let selectedCategory = categoryObjects.find( category => category.categoryId === selectedCategoryId)
    if(selectedCategory == null){
        taskForm.style.display = "none"
        console.log('There is no matching ID!')
    } else {
        taskForm.style.display = "block"
        updateTasksHeaderWording(selectedCategory)
        renderTasksList(selectedCategory)
    }
}

function renderTasksList(selectedCategory){
    clearContent(tasksList)
    selectedCategory.tasks.forEach( task => {
        let taskElement = document.createElement('li')
        taskElement.dataset.taskId = task.taskId
        taskElement.innerText = task.task
        tasksList.appendChild(taskElement)
    })
}

function renderCategoryList(){
    categoryObjects.forEach( category => {
        let categoryElement = document.createElement('li')
        categoryElement.dataset.categoryId = category.categoryId
        categoryElement.innerText = category.categoryName
        if (category.categoryId === selectedCategoryId) 
            categoryElement.classList.add('active-category')
        categoryList.appendChild(categoryElement)
    })    
}

function createCategoryObject(categoryInput){
    // get input, create object with an ID, category name, and task array for later
    const categoryName = categoryInput.value
    const categoryId = generateId()
    return { categoryId, categoryName, tasks: []}
}

function createTaskObject(task){
    const taskId = generateId() 
    return {taskId, task }
}

// Utility Functions

function updateTasksHeaderWording(selectedCategory){
    if(selectedCategoryId == null){
        taskCountContainer.innerText = ''
    }
    const taskCount = selectedCategory.tasks.length
    taskCount > 1 ? taskPlural.innerText = "Tasks Remaining" : taskPlural.innerText = "Task Remaining"
    taskCounter.innerText = taskCount
}

function generateId(){
    // geneate a category ID
    return Date.now().toString()
}

function inputChecker(input){
    return input == null || input == ""
}

function clearContent(parentElement){
    // while loop will remove every children within the parent div until no more <li></li> 
    while (parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild)
    }
}

function saveLocalStorage(){
    localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(categoryObjects))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_CATEGORY_KEY, selectedCategoryId)
    localStorage.setItem(LOCAL_STORAGE_SELECTED_TASK_KEY, selectedTaskId)
}

// Invoke
renderOrganizer()
