import moment from 'moment';
import calendarBuilder from 'calendar-builder';

import render from './render';
import reRender from './reRender';


function DatePicker(root, date, config) {
  this.root = root;
  this.init();
  this.setDate();
};



DatePicker.prototype.init = function() {
  console.log('* * INITIALIZING DATE PICKER * *');
};



DatePicker.prototype.render = render;
DatePicker.prototype.reRender = reRender;



DatePicker.prototype.setDate = function(date) {
  this.calendar = calendarBuilder(date);
  this.render();
};


const myDatePicker = new DatePicker(document.getElementById('date-picker-root'));

window['myDatePicker'] = myDatePicker;

