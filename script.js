const btn_task = document.querySelector(".add_task");
const input_task = document.querySelector(".input_task");
const tasks_list = document.querySelector(".tasks");
const clear_btn = document.querySelector(".clear_tasks");
const remove_selected_btn = document.querySelector(".remove_selected_tasks");

function addRemovable(element) {
    element.addEventListener("animationend", () => {
        if (element.classList.contains("hide")) {
            element.remove();
        }
    });

    checkbox = element.children[0].children[1];

    checkbox.checked = false;
    checkbox.parentElement.classList.toggle("checked", checkbox.checked);
    checkbox.addEventListener("change", (new_element) => {
        new_element = new_element.target;
        new_element.parentElement.classList.toggle(
            "checked",
            new_element.checked
        );
    });
}

function addElementToTasks() {
    const task = input_task.value;

    const taskElement = document.createElement("li");

    taskElement.innerHTML = `
        <label class="task">
            <span>${task}</span>
            <input type="checkbox" class="checkbox">
        </label>
    `;

    tasks_list.appendChild(taskElement);
    input_task.value = "";

    addRemovable(taskElement);
}

btn_task.addEventListener("click", addElementToTasks);

input_task.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        addElementToTasks();
        document.activeElement.blur();
    }
});

clear_btn.addEventListener("click", () => {
    tasks_list.replaceChildren();
});

remove_selected_btn.addEventListener("click", () => {
    const removeTasks = [];

    for (let task of tasks_list.children) {
        const label = task.children[0];
        const checkbox = label.children[1];

        if (checkbox.checked) {
            removeTasks.push(task);
        }

        checkbox.checked = false;
    }

    for (let task of removeTasks) {
        task.classList.add("hide");
    }
});

document.querySelectorAll("li").forEach((element) => {
    addRemovable(element);
});
