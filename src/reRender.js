// This function changes the contents of the calendar to prevent rerendering the whole datepicker from scratch

const reRender = function() {

  const { tbody, calendar } = this;

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
      if (date.date == currentDate.innerText) return;
      currentDate.innerHTML = date.date ? date.date : '&nbsp;';
    });
  });
};


export default reRender;