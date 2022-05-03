const categoryList = document.querySelector('[data-category-list]')


let exampleCategories = ['Programming', 'Shopping']

function renderOrganizer(){
    exampleCategories.forEach( category => {
        let categoryItem = document.createElement('li')
        categoryItem.dataset.categoryId = "2"
        categoryItem.innerText = category
        categoryList.appendChild(categoryItem)
    })
    
}

renderOrganizer()
