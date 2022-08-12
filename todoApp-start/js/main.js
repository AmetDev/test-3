// Находим элементы на странице

const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];
checkEmptyList();


if (localStorage.getItem('tasks')) {
    
    console.log(JSON.parse(localStorage.getItem('tasks')))
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach( function(task) {
        renderTask(task);
    })
        
}


form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);


//функции
function addTask(event) {
     //Отменяем отправку формы
     event.preventDefault();

     //Достаем текст задачаи из поля ввода
     const taskText = taskInput.value
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    //добавляем задачу в массив с задачами
    tasks.push(newTask);

    //Сохраняем список задач в хранищиле браузера LocalStorage
    saveLocalStorage() 


    console.log(tasks)

    renderTask(newTask);
 
 
     //Очищаем поля воода и возращаем на него фокус
     taskInput.value = "";
     taskInput.focus()
     checkEmptyList();


 
}

function deleteTask(event) {
    //Проверяем если клик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return
    
    event.target.dataset.action === 'delete' 

    const parentNode = event.target.closest('.list-group-item');
    parentNode.remove()

    //Определяем ID задачи
    const id = Number(parentNode.id)
    //находим  индекс задачи в массиве
    // const index = tasks.findIndex((task) => task.id === id);

    // console.log(index)
    // //Удаляем задачу из массива с задачами
    // tasks.splice(index, 1)
    
    tasks = tasks.filter( function(task) {
        if(task.id === id) {
            return false
        } else {
            return true
        }
    })
    //Сохраняем список задач в хранищиле браузера LocalStorage
    saveLocalStorage() 
    checkEmptyList()

    

}

function doneTask(event) {
    //Проверяем если клик был НЕ по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return

    


    //Проверяем если клик был по кнопке "задача выполнена"
    event.target.dataset.action === 'done' 
    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const task = tasks.find(function(task) {
        if (task.id === id) {
            return true
        }
    })

    task.done = !task.done;
    //Сохраняем список задач в хранищиле браузера LocalStorage
    saveLocalStorage() 


    const taskTitle= parentNode.querySelector('.task-title');
    taskTitle.classList.toggle("task-title--done");
    
}

function checkEmptyList() {
    if(tasks.length === 0) {
        const emptyListElement = 
        `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`

        tasksList.insertAdjacentHTML('afterbegin', emptyListElement)
    }

    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
     //Формируем CSS класс
     const cssClass = task.done ?"task-title task-title--done" : "task-title";
     
     //Формируем разметку для новой задачи
     const taskHTML = 
     `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
         <span class="${cssClass}">${task.text}</span>
         <div class="task-item__buttons">
             <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
             </button>
             <button type="button" data-action="delete" class="btn-action">
                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
             </button>
         </div>
     </li>`;
     
 
     //Добавляем задачу на страницу
     tasksList.insertAdjacentHTML('beforeend', taskHTML);
 
}