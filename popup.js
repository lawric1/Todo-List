var inputField = document.getElementById("inputField");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");

getTasks();

function addTask() {
    var task = document.createElement('li');
    task.classList.add("task");

    var taskDescription = document.createElement('p');
    taskDescription.classList.add("description");
    taskDescription.innerHTML = inputField.value;
    
    var controls = document.createElement('div');

    var checkbox = document.createElement('input');
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    var removeBtn = document.createElement('a');
    var buttomIcon = document.createElement('img');
    buttomIcon.src = chrome.runtime.getURL("images/bin.png");
    removeBtn.classList.add("removeBtn");
    removeBtn.appendChild(buttomIcon);
    
    if (taskDescription.innerHTML) {
        controls.appendChild(checkbox);
        controls.appendChild(removeBtn);
        task.appendChild(taskDescription);
        task.appendChild(controls);
        taskList.appendChild(task);    

        inputField.value = ''

        saveTasks();
    }

    updateTaskState(taskDescription, checkbox);
    removeTask(removeBtn, task);
}

function updateTaskState(taskDescription, checkbox) {
    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            checkbox.setAttribute("checked", "checked");
            taskDescription.style.textDecorationLine = "line-through";
            taskDescription.style.opacity = "0.4";
        } else {
            checkbox.removeAttribute("checked");
            taskDescription.style.textDecorationLine = "None";
            taskDescription.style.opacity = "1";
        }

        saveTasks();
    }, false);
}

function removeTask(removeBtn, task) {
    removeBtn.addEventListener("click", () => {
        task.remove()

        saveTasks();
    }, false);
}

function saveTasks(){
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
        
        data.Tasks.forEach((data) => {
            var temp = document.createElement('div');
            temp.innerHTML = data;

            var task = temp.firstChild

            taskList.appendChild(temp.firstChild);

            addEventListeners(task);
        });
    });
}

function addEventListeners(task) {
    var taskDescription = task.getElementsByClassName('description')[0];
    var checkbox = task.getElementsByClassName('checkbox')[0];
    var removeBtn = task.getElementsByClassName('removeBtn')[0];

    console.log(taskDescription, checkbox, removeBtn);

    updateTaskState(taskDescription, checkbox);
    removeTask(removeBtn, task);
}

addBtn.addEventListener("click", addTask, false);

document.body.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
}, false);

// Todo:
    //  Style with CSS
    // Add Edit Button