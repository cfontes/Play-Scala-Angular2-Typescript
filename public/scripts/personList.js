var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var PersonList = (function () {
    function PersonList(http) {
        this.http = http;
        this.peopleList = ["Eat Breakfast", "Walk Dog", "Breathe"];
    }
    PersonList.prototype.addPerson = function (personName) {
        this.http.post('/person', '{name: ' + personName + ", age: 15}");
    };
    PersonList.prototype.doneTyping = function ($event) {
        if ($event.which === 13) {
            this.addPerson($event.target.value);
            $event.target.value = null;
        }
    };
    PersonList = __decorate([
        angular2_1.Component({
            selector: 'person-list',
            viewInjector: [angular2_1.httpInjectables]
        }),
        angular2_1.View({
            template: "\n    <ul>\n      <li *ng-for=\"#person of peopleList\">\n        {{ person }}\n      </li>\n    </ul>\n    <input #persontext (keyup)=\"doneTyping($event)\">\n    <button (click)=\"addPerson(persontext.value)\">Add Person</button>\n    <p *ng-if=\"peopleList.length > 3\">You have many friends!</p>\n    ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }),
        __param(0, angular2_1.Inject(angular2_1.Http)), 
        __metadata('design:paramtypes', [Object])
    ], PersonList);
    return PersonList;
})();
angular2_1.bootstrap(PersonList);
//# sourceMappingURL=personList.js.map