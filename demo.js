import CalendarEvent from "./models/CalendarEvent.js";
import * as luxon from "./node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

function callback() {
  // alert('Test')
  console.log('Testing callback as field');
}
function generateEvents() {

  const testEvents = [
    new CalendarEvent(
      "One",
      "Dummy Data",
      "rgb(255 0 0 / 50%)",
      DateTime.fromISO('2022-07-04T08:30'),
      DateTime.fromISO('2022-07-04T15:30'),
      () => {
        console.log('Testing callback as field')
      }

    ),
    new CalendarEvent(
      "Two",
      "Dummy Data",
      "rgb(0 255 0 / 50%)",
      DateTime.fromISO('2022-07-05T12:30'),
      DateTime.fromISO('2022-07-05T18:00'),
      callback
    ),
    new CalendarEvent(
      "Three",
      "Dummy Data",
      "rgb(0 0 255 / 50%)",
      DateTime.fromISO('2022-07-07T10:00'),
      DateTime.fromISO('2022-07-07T19:00'),
      callback
    )
  ];
  return testEvents;
}

export default function demoApp() {
  let events = generateEvents();
  console.log(events)

  return {
    events
  }

}