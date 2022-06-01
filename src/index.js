import "./style.css"

const listsContainer = document.querySelector("[data-lists]")
const contentContainer = document.getElementById("contentContainer")

const memoDisplayContainer = document.querySelector("[data-list-memo-container]")
const listTitle= document.querySelector("[data-list-title]")
const tasksContainer = document.querySelector("[data-tasks]")







const newListForm = document.querySelector("[data-new-list-form]")
const newListInput = document.querySelector("[data-new-list-input]")
const activeListTitle = document.getElementsByClassName("activeList")
console.log(activeListTitle)

const sideBarContainer = document.getElementById("sidebar")



const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_LIST_ACTIVE = "task.activeList"

let lists = []
lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let activeList = localStorage.getItem(LOCAL_STORAGE_LIST_ACTIVE)



contentContainer.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase() === "button"){
        const output = document.getElementById("memoTextOutput")
        console.log("click")
        output.innerText = 'TEST'

    }
})


sideBarContainer.addEventListener("click", e => {
    console.log(e)
    if(e.target.tagName.toLowerCase() === "li"){
        activeList = e.target.dataset.listId
        console.log(activeList)
        save()
        Display()
        //setActivePageContent()
        console.log(activeListTitle)
    }
})

sideBarContainer.addEventListener("click", e =>{
    if(e.target.tagName.toLowerCase() === "button" && e.target.id !== "addItemBtn"){
        lists = lists.filter(list => list.id !== activeList)
        activeList = null
        save()
        Display()
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
    Display()
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

const Display =()=>{
    clearElement(listsContainer)
    displayList()

    const selectedList = lists.find(list => list.id === activeList)
    if(activeList == null){
        memoDisplayContainer.style.display ="none"
        
    }else{
        memoDisplayContainer.style.display =""
        listTitle.innerText = selectedList.name

    }
}

const displayList =()=> {

    lists.forEach(list =>{
        const listElement = document.createElement("li")
        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("class", "deleteBtn")
        listElement.dataset.listId = list.id
        listElement.classList.add("listItems")
        listElement.innerText = list.name
        listElement.appendChild(deleteBtn)

        
        if (list.id == activeList) {
            listElement.classList.add("activeList")
        }
        listsContainer.appendChild(listElement)
        
    })

}

const clearElement = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}



Display()