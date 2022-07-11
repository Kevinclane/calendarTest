//3rd party
import * as luxon from "./node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

//internal
import demoApp from "./demo.js";
import Calendar from "./models/Calendar.js";


function validateInputs(varArgs) {
  let i = 0;
  let res = [];
  while (i < varArgs.length) {
    if (!varArgs[i].field) {
      res.push("Must provide " + varArgs[i].name);
    }
    i++;
  }
  return res;
}

function consoleErrors(varArgs) {
  let i = 0;
  while (i < varArgs.length) {
    console.error(varArgs[i]);
    i++;
  }
}


//demo data setup
let demoData = demoApp();
let events = demoData.events;


let calendarTest = new Calendar(demoData.events[0].StartTime, events, 2);

calendarTest.buildWeekCalendarToId("calendar");