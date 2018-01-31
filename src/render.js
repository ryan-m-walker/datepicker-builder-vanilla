

const render = function() {
  const numOfWeeks = this.calendar.numberOfWeeks;

  if (this.tbody) {
    this.reRender();
    return;
  };

  this.thead = document.createElement('thead');
  this.

  this.tbody = document.createElement('tbody');
  this.calendar.calendar.forEach((row) => {
    let tr = document.createElement('tr');
    row.forEach((date) => {
      let td = document.createElement('td');
      td.classList.add(date.date ? date.dayAbrv : 'nodate');
      td.innerHTML = date.date ? date.date : '&nbsp;';
      tr.appendChild(td);
    });
    this.tbody.appendChild(tr);
  });
  this.root.appendChild(this.tbody);
};


export default render;
