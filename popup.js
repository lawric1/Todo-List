var inputField = document.getElementById("inputField");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");

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
    }
    

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            taskDescription.style.textDecorationLine = "line-through";
            taskDescription.style.opacity = "0.4";
        } else {
            taskDescription.style.textDecorationLine = "None";
            taskDescription.style.opacity = "1";
        }
    }, false);

    deleteBtn.addEventListener("click", () => {task.remove()}, false);
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
}, false)