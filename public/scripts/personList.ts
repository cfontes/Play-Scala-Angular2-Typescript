import {Component, View, bootstrap, NgFor, NgIf, Http, Inject, httpInjectables} from 'angular2/angular2';
@Component({
    selector: 'person-list',
    viewInjector: [httpInjectables]
})
@View({
    template: `
    <ul>
      <li *ng-for="#person of peopleList">
        {{ person }}
      </li>
    </ul>
    <input #persontext (keyup)="doneTyping($event)">
    <button (click)="addPerson(persontext.value)">Add Person</button>
    <p *ng-if="peopleList.length > 3">You have many friends!</p>
    `,
    directives:[NgFor, NgIf]
})

class PersonList {

    peopleList: Array<string>;
    http: Http;

    constructor(@Inject(Http) http) {
        this.http = http;
        this.peopleList = ["Eat Breakfast", "Walk Dog", "Breathe"];
    }

    addPerson(personName: string) {
        this.http.post('/person','{name: '+personName+", age: 15}");
    }

    doneTyping($event) {
        if($event.which === 13) {
            this.addPerson($event.target.value);
            $event.target.value = null;
        }
    }
}
bootstrap(PersonList);