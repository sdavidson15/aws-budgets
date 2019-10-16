import Controller from './controller/Controller';
import View from './view/View';

// TODO: make AppState a variable that the Controller owns, and a parent global that owns both
// View and Controller. Whatever the parent is, it controls communication between View and Controller.
Controller.init();
View.init();