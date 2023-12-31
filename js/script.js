{
  let tasks = [

  ];

  let hideDoneTask = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((task, index) => index !== taskIndex
    );
    render();
  };

  const removeAllTasks = () => {
    tasks = [];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );

    render();
  };

  const toggleHideDoneTask = () => {
    hideDoneTask = !hideDoneTask;
    render();
  };

  const markAllTasksCompleted = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderButtons = () => {
    const buttonElements = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonElements.innerHTML = "";
      return;
    }

    buttonElements.innerHTML = `
      <button class="button js-toggleHideDoneTasks">
        ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="button js-markAllCompleted"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
      </button>
      <button type="reset" class="button button--reset js-reset">Usuń wszystkie</button>
    `;
  };

  const bindButtonEvents = () => {
    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTask);
    }

    const markAllCompletedTasksButton = document.querySelector(".js-markAllCompleted");

    if (markAllCompletedTasksButton) {
      markAllCompletedTasksButton.addEventListener("click", markAllTasksCompleted);
    }

    const resetElements = document.querySelector(".js-reset");

    if (resetElements) {
      resetElements.addEventListener("click", removeAllTasks);
    }

  };

  const renderTasks = () => {
    const taskToHTML = task => `
      <li class="list__item${task.done && hideDoneTask ? " list__item--hidden" : ""} js-tasks
      ">
        <button class="list__buttonTask list__buttonTask--toggleDone js-done">
          ${task.done ? " ✓ " : ""}
        </button>
        <span class="list__content ${task.done ? "list__content--done" : ""}">
          ${task.content}
        </span>
        <button class="list__buttonTask list__buttonTask--remove js-remove">
          🗑
        </button>
      </li>
    `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");

  };

  render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
    bindButtonEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
    }
    newTaskElement.value = "";
    newTaskElement.focus();
  };

  const resetForm = () => {

    const buttonElements = document.querySelector(".js-buttons");
    const resetElements = document.querySelector(".js-reset");
    buttonElements.innerHTML = "";
    resetElements.innerHTML = ""
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
    form.addEventListener("reset", resetForm);
  };

  init();
}
