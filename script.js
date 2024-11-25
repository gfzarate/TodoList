document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');
    const dingSound = document.getElementById('dingSound');
    const motivationalQuote = document.getElementById('motivationalQuote');

    const quotes = [
        "You've got this!",
        "One task at a time, you're doing great!",
        "Keep it up, superstar!",
        "You're making progress, awesome job!",
        "Believe you can and you're halfway there!"
    ];

    addTodoButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const todoItem = createTodoElement(todoText);
            todoList.appendChild(todoItem);
            todoInput.value = '';
            todoItem.classList.add('bounce');
            updateMotivationalQuote();
        }
    }

    function createTodoElement(todoText) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', handleTodoStatusChange);

        const span = document.createElement('span');
        span.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteTodo);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        return li;
    }

    function handleTodoStatusChange(e) {
        const todoItem = e.target.closest('.todo-item');
        todoItem.classList.toggle('completed');

        if (e.target.checked) {
            dingSound.play();
            todoItem.classList.add('fade-green');
            setTimeout(() => {
                todoItem.classList.remove('fade-green');
                todoList.appendChild(todoItem);
            }, 500);
        } else {
            todoList.insertBefore(todoItem, todoList.firstChild);
        }

        updateMotivationalQuote();
    }

    function deleteTodo(e) {
        const todoItem = e.target.closest('.todo-item');
        todoItem.classList.add('fade-red');
        setTimeout(() => {
            todoList.removeChild(todoItem);
            updateMotivationalQuote();
        }, 300);
    }

    function updateMotivationalQuote() {
        const completedTasks = document.querySelectorAll('.todo-item.completed').length;
        const totalTasks = document.querySelectorAll('.todo-item').length;

        if (totalTasks > 0) {
            const progress = Math.round((completedTasks / totalTasks) * 100);
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            motivationalQuote.textContent = `${randomQuote} (${progress}% completed)`;
        } else {
            motivationalQuote.textContent = "Add some tasks and let's get productive!";
        }
    }

    updateMotivationalQuote();
});

