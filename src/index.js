import moment from 'moment';
import calendarBuilder from 'calendar-builder';


class DatePicker {

  constructor(root, date = moment(), config) {
    this.root = root;
    this.selectedDate = undefined;
    this.selectedMoment = undefined;
    this.setDate(date, config);
    this.initEvents();
  }


  setDate = (date, config) => {
    if (date && date._isAMomentObject) {
      this.date = date;
    } else if (date && !date._isAMomentObject) {
      this.date = moment(date);
    } else {
      this.date = moment();
    }
    this.calendar = calendarBuilder(this.date, config);
    this.render();
  }

  render = () => {
    const numOfWeeks = this.calendar.numberOfWeeks;

    if (this.table) {
      this.reRender();
      return;
    };

    this.table = document.createElement('table');

    this.thead = document.createElement('thead');
    const monthRow = document.createElement('tr');
    const monthTd = document.createElement('td');
    monthTd.textContent = this.calendar.month;
    monthTd.setAttribute('colspan', 7);
    monthTd.classList.add('month');
    monthRow.appendChild(monthTd);
    const weekRow = document.createElement('tr');
    this.calendar.weekAbrv.forEach((weekday, index) => {
      let weekdayTd = document.createElement('td');
      weekdayTd.classList.add(weekday);
      weekdayTd.textContent = weekday;
      weekRow.appendChild(weekdayTd);
    });
    this.thead.appendChild(monthRow);
    this.thead.appendChild(weekRow);


    this.tbody = document.createElement('tbody');
    this.calendar.calendar.forEach((row) => {
      let tr = document.createElement('tr');
      row.forEach((date) => {
        let td = document.createElement('td');
        td.classList.add(date.date ? date.dayAbrv.toLowerCase() : 'nodate');
        td.innerHTML = date.date ? date.date : '&nbsp;';
        tr.appendChild(td);
      });
      this.tbody.appendChild(tr);
    });
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.root.appendChild(this.table);
  }

  

  initEvents() {
    this.tbody.addEventListener('click', (event) => {
      if (event.target.innerHTML !== '&nbsp;') {
        this.selectedMoment = moment(this.date).date(event.target.innerText);
        this.selectedDate = this.selectedMoment.toDate();
        if (this._onSelectCallBack) this._onSelectCallBack(event);
        this.reRender();
      }
    });
  }

  onSelectDate = (callback) => {
    this._onSelectCallBack = callback;
  };


  reRender = () => {
    const { tbody, thead, calendar } = this;
  
    thead.children[0].children[0].innerText = this.calendar.month;

    // If the new calendar has more rows than currently exist on calendar add rows until match
    while (tbody.children.length < calendar.numberOfWeeks) {
      var tr = document.createElement('tr');
      for (let i = 0; i < 7; i++) {
        let td = document.createElement('td');
        td.innerHTML = '&nbsp;';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  
    // If the new calendar has less rows than currently exist remove rows until match
    while (tbody.children.length > calendar.numberOfWeeks) {
      const lastChild = tbody.children[tbody.children.length - 1];
      tbody.removeChild(lastChild);
    }
  
    // Iterate over the old calendar with the new dates and update content
    calendar.calendar.forEach((row, rowIndex) => {
      row.forEach((date, dateIndex) => {
        let currentDate = tbody.children[rowIndex].children[dateIndex];
        if (date.date === this.selectedMoment.date()) {
          currentDate.classList.add('selected-date');
        } else {
          currentDate.classList.remove('selected-date');
        }
        if (date.date == currentDate.innerText) return;
        currentDate.innerHTML = date.date ? date.date : '&nbsp;';
      });
    });
  };

  incrementMonth = () => {
    this.setDate(this.date.add(1, 'month'));
  };
  
  decrementMonth = () => {
    this.setDate(this.date.add(-1, 'month'));
  }
}



const myDatePicker = new DatePicker(document.getElementById('date-picker-root'), {
  startDay: 'Wednesday'
});

window['myDatePicker'] = myDatePicker;
window['moment'] = moment;

myDatePicker.onSelectDate(() => {
  console.log(myDatePicker.selectedDate);
});