
const DAYCOLUMNCOUNT = 7;
const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DAYSOFTHEWEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function generateHourAxisNames(hourDividend) {
  let amHours = [];
  let pmHours = [];
  let i = 0;

  while (i < HOURS.length) {

    let x = 0;
    while (x < hourDividend) {

      let minutes = (60 / hourDividend) * (x);
      if (minutes == "0") {
        minutes += "0";
      }

      amHours.push(HOURS[i] + ":" + minutes + " am");
      pmHours.push(HOURS[i] + ":" + minutes + " pm");
      x++;

    }
    i++;
  }

  return amHours.concat(pmHours);
}

function generateYAxisNameCell(name, index) {
  let evenOdd = index % 2;
  let template = `
    <div class="cell-${evenOdd}">
      ${name}
    </div>
  `;
  return template;
}

function generateYAxisLabels() {

  let hourDividend = 2;
  let hours = generateHourAxisNames(hourDividend);

  let templateOpenTag = `<div class="calendar-column">`;
  let templateBody = ``;
  let templateCloseTag = `</div>`;

  let i = 0;
  while (i < hours.length) {
    templateBody += generateYAxisNameCell(hours[i], i);
    i++
  }

  return templateOpenTag + templateBody + templateCloseTag;

}

function generateTableHeader() {
  let templateOpenTag = `<div class="calendar-row">`;
  let templateBody = `
    <div class="calendar-column">
      <div class="table-header-cell super-center"> </div>
    </div>
    `;
  let templateCloseTag = `</div>`;

  let i = 0;
  while (i < DAYSOFTHEWEEK.length) {
    templateBody += `
    <div class="calendar-column">
      <div class="table-header-cell super-center">
        ${DAYSOFTHEWEEK[i]}
      </div>
    </div>
    `
    i++;
  };

  return templateOpenTag + templateBody + templateCloseTag;
}

function generateColumns() {
  let templateOpenTag = `<div class="calendar-column">`;
  let templateBody = ``;
  let templateCloseTag = `</div>`;

  let i = 0;
  while (i < 10) {
    templateBody += `
      <div>
        test
      </div>
    `;
    i++;
  };

  return templateOpenTag + templateBody + templateCloseTag;

};

function generateContainer(id) {

  let yAxisLabels = generateYAxisLabels();
  let tableHeader = generateTableHeader();
  let columns = generateColumns();

  let template = `
    <div class="calendar-container">
      ${tableHeader}
      <div class="calendar-row">
        ${yAxisLabels}
        ${columns}
      </div>
    </div>
  `;

  let location = document.getElementById(id);
  location.innerHTML = template;
}




generateContainer("calendar");
