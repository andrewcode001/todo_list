const categoryForm = document.querySelector('[data-category-form]')
const categoryList = document.querySelector('[data-category-list]')
const categoryInput = document.querySelector('.input-category')
const categoryBtn = document.querySelector('.btn-category')

// Local Storage Setup
const LOCAL_STORAGE_CATEGORY_KEY = 'category.objects'
let categoryObjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CATEGORY_KEY)) || []


// Main Functions

categoryForm.addEventListener("submit", e => {
    e.preventDefault()
    // if input is NULL, return and do not run program
    if(inputChecker(categoryInput.value)) return

    // Main application logic starts here...
    const inputCategory = createCategoryObject(categoryInput)
    categoryObjects.push(inputCategory)
    categoryInput.value = null
    console.log(categoryObjects)
    saveLocalStorage()
    renderOrganizer()
    // saveLocalStorage()
})

function renderOrganizer(){
    clearContent(categoryList)
    categoryObjects.forEach( category => {
        let categoryElement = document.createElement('li')
        categoryElement.dataset.categoryId = category.categoryId
        categoryElement.innerText = category.categoryName
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
}

renderOrganizer()
