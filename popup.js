var inputField = document.getElementById("inputField");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");

function addTask() {
    var task = document.createElement('li');
    task.classList.add("task");

    var taskDescription = document.createElement('p');
    task.classList.add("description");
    taskDescription.innerHTML = inputField.value;
    
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    if (taskDescription.innerHTML) {
        task.appendChild(taskDescription);
        task.appendChild(checkbox);
        taskList.appendChild(task);    
    }
    
    inputField.value = ''

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            taskDescription.style.textDecorationLine = "line-through";
            taskDescription.style.opacity = "0.4";
        } else {
            taskDescription.style.textDecorationLine = "None";
            taskDescription.style.opacity = "1";
        }
    }, false);
}
// inputField.addEventListener("keydown", (event) => {
//     if (event.code === "Enter") {
//         addTask();
//     }
// }, false);

addBtn.addEventListener("click", addTask, false);
