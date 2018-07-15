var log = console.log.bind(console)
var e = (selector) => {
    var a = document.querySelector(selector)
    return a
}

var todoTemplate = (test) => {
    var a =`<li class="todo-cell" data-state = "unCompleted">
         ${test}
        <div class="div-todoButtons">
            <button class="button-delete todoButtons">
                <svg class="class-svg-remove" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="class-svg-remove noFill" width="22" height="22"/><g><g><path class="class-svg-remove fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="class-svg-remove fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill class-svg-remove" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="class-svg-remove fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>
            </button>
            <button class="button-done todoButtons">
                <svg class="class-svg-complete" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="class-svg-complete fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg
            </button>
        </div>
    </li>`
    return a
}

var loadTodos = () => {
    var s = localStorage.savedTodos
    if (s == undefined ) {
        return []
    }else {
        var ts = JSON.parse(s)
        return ts
    }
}

var todos = loadTodos()

var insertTodos = () => {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        addTodoCell(todo)
    }
}

var saveTodo = (todoText) => {
    todos.push(todoText)
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

var removeLocalTodos = (container, todo) => {
    var ts = container.querySelectorAll('.todo-cell')
    for (var i = 0; i < ts.length; i++) {
        var t = ts[i]
        if (t = todo) {
            todos.splice(i, 1)
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}


var addTodoCell = (todoText) => {
    var html = todoTemplate(todoText)
    var allTodoList = e('.ul-needTodo')
    allTodoList.insertAdjacentHTML('beforeend', html)
}

var bindAddButtonEvent = () => {
    var addButton = e('#id-button-add')
    addButton.addEventListener('click',function(event) {
        var todoInput = e("#id-input-todoText")
        var todoText = todoInput.value
        saveTodo(todoText)
        if (todoText) {
            addTodoCell(todoText)
            todoInput.value = ""
        }
    })
}

var removeTodo = (self) => {
    var container = e('.todo-container')
    var parentTodoCell = self.closest("li")
    removeLocalTodos(container, parentTodoCell)
    parentTodoCell.classList.add("removeLi")
    setTimeout(function() {
        parentTodoCell.remove()
    }, 300)

}

var completeTodo = (self) => {
    var parentTodoCell = self.closest("li")
    var state = parentTodoCell.dataset.state
    if (state == "unCompleted") {
        var doneList = e(".ul-doneTodo")
        doneList.appendChild(parentTodoCell)
        parentTodoCell.dataset.state = "done"
    }else {
        var unCompleteList = e(".ul-needTodo")
        unCompleteList.appendChild(parentTodoCell)
        parentTodoCell.dataset.state = "unCompleted"
    }
}

var bindTodoContainerEvents = () => {
    var todoContainer = e(".todo-container")
    todoContainer.addEventListener("click", function(event) {
        var self = event.target
        var classList = self.classList
        if(classList.contains("class-svg-remove")|| classList.contains("button-delete")) {
            removeTodo(self)
        } else if(classList.contains("class-svg-complete")||classList.contains("button-done")) {
            completeTodo(self)
        }
    })
}

var __main = () =>{
    insertTodos()
    bindAddButtonEvent()
    bindTodoContainerEvents()
}

__main()
