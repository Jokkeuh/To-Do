import "./style.css"

const listsContainer = document.querySelector("[data-lists]")
const listTitles = document.querySelector("[data-listTitle]")

const newListForm = document.querySelector("[data-new-list-form]")
const newListInput = document.querySelector("[data-new-list-input]")
const activeListTitle = document.getElementById("activeListTitle")


const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_LIST_ACTIVE = "task.activeList"
let lists = []
lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let activeList = localStorage.getItem(LOCAL_STORAGE_LIST_ACTIVE)

listsContainer.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase() === "li"){
        activeList = e.target.dataset.listId
        console.log(activeList)
        save()
        addListItem()
        //setActivePageContent()
    }
})
listsContainer.addEventListener("click", e =>{
    if(e.target.tagName.toLowerCase() === "button"){
        lists = lists.filter(list => list.id !== activeList)
        activeList = null
        save()
        addListItem()
    }
    
})

newListForm.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e)
    const listName = newListInput.value
    if(listName === null || listName === ""){
        return
    }

    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    addListItem()
    save()
})





const createList = (name) => {
    return {id: Date.now().toString(), name: name, task: []}
}

const setActivePageContent = () => {
    
}


const save = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

const addListItem =()=>{
    clearElement(listsContainer)
    
    lists.forEach(list =>{
        const listElement = document.createElement("li")
        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("class", "deleteBtn")
        listElement.dataset.listId = list.id
        listElement.classList.add("listItems")
        listElement.innerText = list.name
        
        if (list.id == activeList) {
            listElement.classList.add("activeList")
        }
        listsContainer.appendChild(listElement)
        listElement.appendChild(deleteBtn)
    })
    
}

const clearElement = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}



addListItem()