let draggedTask = null;

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value === "") return;

    createTaskElement(input.value, "todo");

    input.value = "";
}

function createTaskElement(text, columnId) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.draggable = true;

    // texto da tarefa
    const span = document.createElement("span");
    span.textContent = text;

    // eventos de drag
    task.addEventListener("dragstart", () => {
        draggedTask = task;
    });

    // container de botões
    const actions = document.createElement("div");
    actions.classList.add("actions");

    // editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    editBtn.onclick = (e) => {
        e.stopPropagation();

        const newText = prompt("Editar tarefa:", span.textContent);

        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText;
        }
    };

    // excluir
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        task.remove();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    task.appendChild(span);
    task.appendChild(actions);

    document.getElementById(columnId).appendChild(task);
}

// drag and drop
document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", () => {
        column.appendChild(draggedTask);
    });
});
