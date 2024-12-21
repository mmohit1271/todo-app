const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span style="text-decoration: ${todo.completed ? "line-through" : "none"};">
                ${todo.task}
            </span>
            <button class="complete" data-id="${todo.id}">${todo.completed ? "Undo" : "Complete"}</button>
            <button class="delete" data-id="${todo.id}">Delete</button>
        `;
        todoList.appendChild(li);
    });
};

const addTodo = (task) => {
    todos.push({ id: Date.now(), task, completed: false });
    saveTodos();
    renderTodos();
};

const updateTodoStatus = (id) => {
    todos = todos.map(todo =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
};

const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id != id);
    saveTodos();
    renderTodos();
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(taskInput.value);
    taskInput.value = "";
});

todoList.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    if (e.target.classList.contains("complete")) {
        updateTodoStatus(id);
    } else if (e.target.classList.contains("delete")) {
        deleteTodo(id);
    }
});

renderTodos();

