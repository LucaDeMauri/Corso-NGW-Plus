
  type TodoItem = {
    id: Number;  
    task: string;
  };
  
  let todoList: TodoItem[] = [];

  let counter = 0
  
  function addTask(task: string): void {
    const newTask: TodoItem = {
      id: counter++,  
      task: task,
    };
    todoList.push(newTask);
    renderTaskList();
  }
  
  
  function removeTask(id: Number): void {
    todoList = todoList.filter(task => task.id !== id);
    renderTaskList();
  }
  
  function renderTaskList(): void {
    const taskList = document.getElementById('taskList')! as HTMLUListElement;
    if (taskList) {
      taskList.innerHTML = '';  
      todoList.forEach(task => {
        const li = document.createElement('li')
        li.textContent = task.task;
        li.addEventListener("click", () =>{
            removeTask(task.id);
        })
  
        taskList.appendChild(li);
      });
    }
  }
  
  const addTaskButton = document.getElementById('addTaskButton');
  if (addTaskButton) {
    addTaskButton.addEventListener('click', () => {
      const taskInput = document.getElementById('taskInput') as HTMLInputElement;
      if (taskInput && taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = '';  
      }
    });
  }
  