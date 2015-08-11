import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
@Component({
    selector: 'todo-list'
})
@View({
    template: `
    <ul>
      <li *ng-for="#todo of todos">
        {{ todo }}
      </li>
    </ul>
    <input #todotext (keyup)="doneTyping($event)">
    <button (click)="addTodo(todotext.value)">Add Todo</button>
    <p *ng-if="todos.length > 3">You have many friends!</p>
    `,
    directives:[NgFor, NgIf]
})

class Todo {
    todos: Array<string>;
    constructor() {
        this.todos = ["Eat Breakfast", "Walk Dog", "Breathe"];
    }
    addTodo(todo: string) {
        this.todos.push(todo);
    }
    doneTyping($event) {
        if($event.which === 13) {
            this.addTodo($event.target.value);
            $event.target.value = null;
        }
    }
}
bootstrap(Todo);