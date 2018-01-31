import moment from 'moment';
import calendarBuilder from 'calendar-builder';

import render from './render';
import reRender from './reRender';


function DatePicker(root, date, config) {
  this.root = root;
  this.init(date);
  this.setDate(date);
};


DatePicker.prototype.init = function(date) {

};

DatePicker.prototype.incrementMonth = function() {
  this.setDate(this.date.add(1, 'month'));
};

DatePicker.prototype.decrementMonth = function() {
  this.setDate(this.date.add(-1, 'month'));
}

DatePicker.prototype.render = render;
DatePicker.prototype.reRender = reRender;


DatePicker.prototype.setDate = function(date) {
  if (date && date._isAMomentObject) {
    this.date = date;
  } else if (date && !date._isAMomentObject) {
    this.date = moment(date);
  } else {
    this.date = moment();
  }
  this.calendar = calendarBuilder(this.date);
  this.render();
  console.log(this.calendar);
};


const myDatePicker = new DatePicker(document.getElementById('date-picker-root'));

window['myDatePicker'] = myDatePicker;
window['moment'] = moment;