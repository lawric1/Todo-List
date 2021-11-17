var inputField = document.getElementById("inputField");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
taskList.style.padding = '8px';

function addTask() {
    var task = document.createElement('li');
    task.style.cssText = `
    display: flex; 
    align-items: center;
    justify-content: space-between;
`

    var taskDescription = document.createElement('p');
    taskDescription.innerHTML = inputField.value;

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    // // checkbox.id = "id";

    task.appendChild(taskDescription);
    task.appendChild(checkbox);
    taskList.appendChild(task);

    inputField.value = ''
}

addBtn.addEventListener("click", addTask, false);