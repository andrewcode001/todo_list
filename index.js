// Category related selectors
const categoryForm = document.querySelector('[data-category-form]')
const categoryList = document.querySelector('[data-category-list]')
const categoryInput = document.querySelector('.input-category')

// Task related selectors
const taskCounter = document.querySelector('[data-tasks-count]')
const taskPlural = document.querySelector('[data-task-plural')
const tasksList = document.querySelector('[data-tasks-list]')
const taskForm = document.querySelector('[data-tasks-form]')
const taskInput = document.querySelector('.input-task')

// Local Storage Setup - create unique namespace
const LOCAL_STORAGE_CATEGORY_KEY = 'category.objects'
const LOCAL_STORAGE_SELECTED_CATEGORY_KEY = 'category.selectedCategoryId'
let categoryObjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || []
let selectedCategoryId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CATEGORY_KEY)


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

taskForm.addEventListener("submit", e => {
    e.preventDefault()
    if(inputChecker(taskInput.value)) return
    const task = taskInput.value
    let selectedCategory = categoryObjects.find( category => category.categoryId === selectedCategoryId)
    selectedCategory.tasks.push(task)
    saveLocalStorage()
    renderOrganizer()
    console.log(selectedCategory.tasks)
})

categoryList.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase()=== 'li'){
        // the click will extract the categoryId, then saves to local storage, re-renders with associated category highlighted
        selectedCategoryId = e.target.dataset.categoryId
        saveLocalStorage()
        renderOrganizer()
    }
})

// Main Functions

function renderOrganizer(){
    clearContent(categoryList)
    renderCategoryList()
    // This will access the selectedCategory based on the clicked selectedCategoryId local storage variable
    let selectedCategory = categoryObjects.find( category => category.categoryId === selectedCategoryId)
    if(selectedCategory == null){
        console.log('There is no matching ID!')
    } else {
        updateTasksHeaderWording(selectedCategory)
        renderTasksList(selectedCategory)
    }
}

function renderTasksList(selectedCategory){
    clearContent(tasksList)
    selectedCategory.tasks.forEach( task => {
        let taskElement = document.createElement('li')
        taskElement.innerText = task
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

// Utility Functions

function updateTasksHeaderWording(selectedCategory){
    const taskCount = selectedCategory.tasks.length
    taskCount >= 0 ? taskPlural.innerText = "Tasks" : taskPlural.innerText = "Task"
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
}

renderOrganizer()
