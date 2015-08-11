/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/rx/rx.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
// Annotation section
@Component({
    selector: 'my-app'
})
@View({
    template: '',
})
// Component controller
class MyAppComponent {
    name: string;
    constructor() {
        this.name = 'Dude!!!';
    }
}
bootstrap(MyAppComponent);