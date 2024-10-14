// Funzione per generare un ID casuale
function generateRandomId() {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(16); // Convertiamo il valore in esadecimale
}
// Array per memorizzare gli elementi della lista
var todoList = [];
var counter = 0;
// Funzione per aggiungere un nuovo elemento alla lista
function addTask(task) {
    var newTask = {
        id: counter++, // Usare la funzione per generare un ID casuale
        task: task,
    };
    todoList.push(newTask);
    renderTaskList();
}
// Funzione per rimuovere un elemento dalla lista
function removeTask(id) {
    todoList = todoList.filter(function (task) { return task.id !== id; });
    renderTaskList();
}
// Funzione per visualizzare gli elementi della lista
function renderTaskList() {
    var taskList = document.getElementById('taskList');
    if (taskList) {
        taskList.innerHTML = ''; // Svuotiamo la lista corrente
        todoList.forEach(function (task) {
            var li = document.createElement('li');
            li.textContent = task.task;
            li.addEventListener("click", function () {
                removeTask(task.id);
            });
            taskList.appendChild(li);
        });
    }
}
// Aggiungiamo un listener per il pulsante "Aggiungi Task"
var addTaskButton = document.getElementById('addTaskButton');
if (addTaskButton) {
    addTaskButton.addEventListener('click', function () {
        var taskInput = document.getElementById('taskInput');
        if (taskInput && taskInput.value.trim()) {
            addTask(taskInput.value.trim());
            taskInput.value = ''; // Resettiamo il campo di input dopo l'aggiunta
        }
    });
}
