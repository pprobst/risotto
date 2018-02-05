window.onload = function() {
    var todoForm = document.getElementById("todoForm");
    var todoList = document.getElementById("todoList");
    var saved = JSON.parse(localStorage.getItem("todos")) || [];

    // retrieve from localStorage
    for(var i = 0; i < saved.length; i++) {
        var oldTodo = document.createElement("li");
        oldTodo.innerText = saved[i].taskV;
        oldTodo.completed = saved[i].completed ? true : false;
        if(oldTodo.completed) 
            oldTodo.style.textDecoration = "line-through";
        createRmvButton(oldTodo);
        todoList.appendChild(oldTodo);
    }

    // create new todo and append it to the list
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var task = document.getElementById("task");

        if (task.value != '') {
            var newTodo = document.createElement("li");
            newTodo.innerText = task.value;
            newTodo.completed = false;
            createRmvButton(newTodo);
            todoList.appendChild(newTodo);
            saved.push({taskV: task.value, completed: false});
            localStorage.setItem("todos", JSON.stringify(saved));
        }

        todoForm.reset();
    });

    // clicking on a task does a line-through
    // clicking on the X button removes the task from the list
    todoList.addEventListener("click", function(event) {
        var clickedItem = event.target;
        
        if (clickedItem.tagName.toLowerCase() === "li") {
            if(!clickedItem.completed) {
                clickedItem.style.textDecoration = "line-through";
                clickedItem.completed = true;
            } else {
                clickedItem.style.textDecoration = "none";
                clickedItem.completed = false;
            }
        } 
        else if (clickedItem.tagName.toLowerCase() === "button") {
            clickedItem.parentNode.remove();
        }

        // updates local storage
        for(var i = 0; i < saved.length; i++) {
            if (saved[i].taskV === clickedItem.parentNode.firstChild.textContent) {
                saved.splice(i, 1);
                localStorage.setItem("todos", JSON.stringify(saved));
                break;
            }
            if (saved[i].taskV === clickedItem.firstChild.textContent) {
                saved[i].completed = clickedItem.completed;
                localStorage.setItem("todos", JSON.stringify(saved));
                break;
            }
        }
    });

    // creates the "X" button
    function createRmvButton(todo) {
        var rmvButton = document.createElement("button");
        rmvButton.setAttribute("id", "rmvButton");
        rmvButton.innerText = "X";
        todo.appendChild(rmvButton);
    }
}