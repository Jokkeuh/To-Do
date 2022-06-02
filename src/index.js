import "./style.css"

const listsContainer = document.querySelector("[data-lists]")
const contentContainer = document.getElementById("contentContainer")

const memoDisplayContainer = document.querySelector("[data-list-memo-container]")
const listTitle= document.querySelector("[data-list-title]")
const tasksCount = document.querySelector("[data-task-count]")
const tasksContainer = document.querySelector("[data-tasks]")
const taskTemplate = document.getElementById("task-template")







const newListForm = document.querySelector("[data-new-list-form]")
const newListInput = document.querySelector("[data-new-list-input]")

const newTaskForm = document.querySelector("[data-new-task-form]")
const newTaskInput = document.querySelector("[data-new-task-input")

const activeListTitle = document.getElementsByClassName("activeList")


const sideBarContainer = document.getElementById("sidebar")



const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_LIST_ACTIVE = "task.activeList"

let lists = []
    lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let activeList = localStorage.getItem(LOCAL_STORAGE_LIST_ACTIVE)






sideBarContainer.addEventListener("click", e => {
    console.log(e)
    if(e.target.tagName.toLowerCase() === "li"){
        activeList = e.target.dataset.listId
        console.log(activeList)
        DisplayAndSave()
        //setActivePageContent()
        console.log(activeListTitle)
    }
})

sideBarContainer.addEventListener("click", e =>{
    if(e.target.tagName.toLowerCase() === "button" && e.target.id !== "addItemBtn"){
        lists = lists.filter(list => list.id !== activeList)
        activeList = null
        DisplayAndSave()
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
    DisplayAndSave()
})

newTaskForm.addEventListener("submit", e  => {
    e.preventDefault()
    console.log(e)
    const taskName = newTaskInput.value
    console.log(taskName)
    if(taskName === null || taskName === ""){
        return
    }
    
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === activeList)
    console.log(selectedList)
    selectedList.tasks.push(task)
    DisplayAndSave()
    
})





const createList = (name) => {
    return {id: Date.now().toString(), name: name, tasks: []}
}

const createTask = (name) =>{
    return { id: Date.now().toString(), name: name, complete: false}
}

function DisplayAndSave(){
    save()
    Display()
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
        
        console.log(selectedList)
        
        clearElement(tasksContainer)
        displayTasks(selectedList)
        

    }
    
}







/*const displayTaskCount=(selectedList)=> {
    displayTasks()
    console.log(selectedList)
    
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
    
    

    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"

    tasksCount.innerText = `${incompleteTaskCount} ${taskString} remaining`
  }*/


    

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

const displayTasks = (selectedList) => {

    selectedList.tasks.forEach(task => {
        const TaskElement = document.importNode(taskTemplate.content, true)
        const checkBox = TaskElement.querySelector("input")
        checkBox.id = task.id
        checkBox.checked = task.complete
        const label = TaskElement.querySelector("label")
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(TaskElement)
    } )
}

const clearElement = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}



Display()