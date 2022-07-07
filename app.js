//3rd party
import * as luxon from "./node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

//internal
import CalendarEvent from "./models/CalendarEvent.js";
import demoApp from "./demo.js";
import {
  millFromSeconds,
  millFromMinutes,
  millFromHours,
  millFromDays,
  millFromWeeks
} from "./calculators/MillisecondCalculator.js";

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let DAYSOFTHEWEEK = [];

function setWeek(primaryEventDate) {
  let dayMilliseconds = millFromDays(1);
  let startOfWeek = DateTime.fromISO(primaryEventDate).startOf("week").minus(dayMilliseconds);
  let i = 0;
  while (i < 7) {
    let nextDayMilliseconds = dayMilliseconds * (i + 1);
    let day = startOfWeek.plus(nextDayMilliseconds);
    DAYSOFTHEWEEK.push(day);
    i++;
  }
}

function getCellTime(time, day) {
  let hour;
  let minute;
  let amPm;

  let split = time.split(" ");
  amPm = split[1];

  split = split[0].split(":");
  hour = split[0];
  minute = split[1];


  if (hour == 12) {
    if (amPm == "am") {
      hour = "00";
    }
  } else if (amPm == "pm") {
    hour = (parseInt(hour) + 12).toString();
  }

  let cellTime = new DateTime(day);
  cellTime = cellTime.plus(
    {
      hour,
      minute
    },
  );



  return cellTime;
}

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

function generateTableHeader() {
  let template = `
      <div class="table-header-cell super-center"></div>
    `;

  let i = 0;
  while (i < DAYSOFTHEWEEK.length) {
    template += `
      <div class="table-header-cell super-center flex-column">
        <div>
          ${DAYSOFTHEWEEK[i].toFormat("MM/dd")}
        </div>
        <div>
          ${DAYSOFTHEWEEK[i].weekdayShort}
        </div>
      </div>
    `
    i++;
  };

  return template;
}

function generateCell(cellTime, events, evenOdd) {

  //need to go through all events and create an interval 
  let cellEvents = events.filter(e => e.Interval.contains(cellTime));

  let template = ``;

  let i = 0;
  while (i < cellEvents.length) {
    template += `
      <div onclick="${cellEvents[i].runCallback}" class="cell-${evenOdd}" style="background-color:${cellEvents[i].Color}">
        ${cellEvents[i].Description}
        <div>
        Start Time:  ${cellEvents[i].StartTime.toFormat("hh:mm")}
        </div>
        <div>
        End Time; ${cellEvents[i].EndTime.toFormat("hh:mm")}
        </div>
      </div>
    `;
    i++
  }

  if (i == 0) {
    template = `
    <div class="cell-${evenOdd}">
    </div>
    `
  }

  return template;
}

function generateRow(time, index, events) {
  let evenOdd = index % 2;

  //y-axis label cell
  let template = `
    <div class="cell-${evenOdd} super-center">
      ${time}
    </div>
  `;

  //probably break this into a "generateCell" function
  let i = 0
  while (i < DAYSOFTHEWEEK.length) {

    let cellTime = getCellTime(time, DAYSOFTHEWEEK[i]);

    template += generateCell(cellTime, events, evenOdd);


    i++;
  };

  return template;
};



function generateRows(events) {

  let yAxisLabels = generateHourAxisNames(2);

  let template = ``;

  let i = 0;
  while (i < yAxisLabels.length) {
    template += generateRow(yAxisLabels[i], i, events);
    i++;
  };

  return template;
};

function validateInputs(varArgs) {
  let i = 0;
  let res = [];
  while (i < varArgs.length) {
    if (!varArgs[i].field) {
      res.push("Must provide " + varArgs[i].name);
    };
    i++;
  }
  return res;
};

function consoleErrors(varArgs) {
  let i = 0;
  while (i < varArgs.length) {
    console.error(varArgs[i]);
    i++;
  }
};

//the loaded week will be loaded based on the primaryEventDate
function loadCaldendar(id, events, primaryEventDate) {

  setWeek(primaryEventDate);

  let parameterErrors = validateInputs(
    { name: "id", field: id },
    { name: "primaryEventDate", field: primaryEventDate }
  );

  if (parameterErrors.length > 0) {
    consoleErrors(parameterErrors);
  } else {
    let tableHeader = generateTableHeader();
    let rows = generateRows(events);

    let template = `
      <div class="calendar-container">
        ${tableHeader}
        ${rows}
      </div>
    `;

    let location = document.getElementById(id);
    location.innerHTML = template;
  }

};

//demo data setup
let demoData = demoApp();
let events = demoData.events;

loadCaldendar("calendar", events, demoData.events[0].StartTime);
