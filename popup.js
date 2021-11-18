var inputField = document.getElementById("inputField");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");

getTasks();

function addTask() {
    var task = document.createElement('li');
    task.classList.add("task");

    var taskDescription = document.createElement('p');
    task.classList.add("description");
    taskDescription.innerHTML = inputField.value;
    
    var controls = document.createElement('div');

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    var deleteBtn = document.createElement('a');
    var buttomIcon = document.createElement('img');
    buttomIcon.src = chrome.runtime.getURL("images/bin.png");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.appendChild(buttomIcon);
    

    if (taskDescription.innerHTML) {
        controls.appendChild(checkbox);
        controls.appendChild(deleteBtn);
        task.appendChild(taskDescription);
        task.appendChild(controls);
        taskList.appendChild(task);    

        inputField.value = ''

        saveTask();
    }
    

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            taskDescription.style.textDecorationLine = "line-through";
            taskDescription.style.opacity = "0.4";
        } else {
            taskDescription.style.textDecorationLine = "None";
            taskDescription.style.opacity = "1";
        }

        saveTask();
    }, false);

    deleteBtn.addEventListener("click", () => {
        task.remove()

        saveTask();
    }, false);
}
// inputField.addEventListener("keydown", (event) => {
//     if (event.code === "Enter") {
//         addTask();
//     }
// }, false);

addBtn.addEventListener("click", addTask, false);

document.body.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        return false;
    }
}, false);


function saveTask(){
    var tasksToSave = [];
    var currentTasks = taskList.getElementsByClassName("task");

    [...currentTasks].forEach((task) => {
        tasksToSave.push(task.outerHTML);
    });

    console.log(tasksToSave);

    chrome.storage.local.set({'Tasks': tasksToSave})
}   

function getTasks(){
    chrome.storage.local.get(['Tasks'], function(data) {
        console.log(data.Tasks);
        
        data.Tasks.forEach((task) => {
            temp = document.createElement('div');
            temp.innerHTML = task;
            taskList.appendChild(temp.firstChild);

            // var deleteBtn = temp.firstChild.getElementsByClassName("deleteBtn");
            // deleteBtn.addEventListener("click", () => {
            //     temp.firstChild.remove()

            //     saveTask();
            // }, false);
        });
    });
}

//Add event listeners to checkbox and delete button of stored elements
