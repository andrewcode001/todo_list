const categoryForm = document.querySelector('[data-category-form]')
const categoryList = document.querySelector('[data-category-list]')
const categoryInput = document.querySelector('.input-category')
const categoryBtn = document.querySelector('.btn-category')

let exampleCategories = []


// Main Functions

categoryForm.addEventListener("submit", e => {
    e.preventDefault()
    // if input is NULL, return and do not run program
    if(inputChecker){
        categoryInput.value = ''
        console.log('There is no valid input!')
        return
    }
    const inputCategory = createCategoryObject(categoryInput)
    exampleCategories.push(inputCategory)
    categoryInput.value = null
    console.log(exampleCategories)
    renderOrganizer()
})

function renderOrganizer(){
    clearContent(categoryList)
    exampleCategories.forEach( category => {
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

renderOrganizer()
