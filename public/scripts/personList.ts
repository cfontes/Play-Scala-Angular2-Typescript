/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="./models/Person.ts" />
import {Component, View, bootstrap, NgFor, NgIf, Http, Inject, httpInjectables, IRequestOptions, RequestOptions, Headers} from 'angular2/angular2';
import {Observable} from 'rx';
import {Person} from "./models/Person";
@Component({
    selector: 'person-list',
    viewBindings : [httpInjectables]
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

    private peopleList: Array<string> = [];
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        this.getAllPeople();
    }

    private getAllPeople() {
        this.peopleList = [];
        this.http.get('/persons').toRx().map(res => res.json()).subscribe(people => {
                _.each(people, (person: Person)=>{
                    this.peopleList.push(person.name);
                });

            }
        )
    };

    addPerson(personName: string) {
        var parameters: string = JSON.stringify({name: personName, age : 15});
        var requestOptions: IRequestOptions = new RequestOptions();
        var header: Headers = new Headers();
        header.append('Content-Type', 'application/json');
        requestOptions.headers = header;
        this.http.post('/person',parameters,requestOptions);
        this.getAllPeople();
    }

    doneTyping($event) {
        if($event.which === 13) {
            this.addPerson($event.target.value);
            $event.target.value = null;
        }
    }
}
bootstrap(PersonList);