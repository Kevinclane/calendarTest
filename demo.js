import CalendarEvent from "./models/CalendarEvent.js";
import * as luxon from "./node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

function callback(color) {
  console.log(color);
}

function generateEvents() {
  const testEvents = [
    new CalendarEvent(
      "One",
      "Dummy Data",
      "rgb(255 0 0 / 50%)",
      DateTime.fromISO("2022-07-04T08:30"),
      DateTime.fromISO("2022-07-04T15:30"),
      () => callback("Red")
    ),
    new CalendarEvent(
      "One.Five",
      "Dummy Data",
      "rgb(255 255 0 / 50%)",
      DateTime.fromISO("2022-07-04T07:30"),
      DateTime.fromISO("2022-07-04T15:30"),
      () => callback("Yellow")
    ),
    new CalendarEvent(
      "Two",
      "Dummy Data",
      "rgb(0 255 0 / 50%)",
      DateTime.fromISO("2022-07-05T12:30"),
      DateTime.fromISO("2022-07-05T18:00"),
      () => callback("Green")
    ),
    new CalendarEvent(
      "Three",
      "Dummy Data",
      "rgb(0 0 255 / 50%)",
      DateTime.fromISO("2022-07-07T10:00"),
      DateTime.fromISO("2022-07-07T19:00"),
      () => callback("Blue")
    ),
    new CalendarEvent(
      "Four",
      "Dummy Data",
      "rgb(0 255 255 / 50%)",
      DateTime.fromISO("2022-07-07T11:00"),
      DateTime.fromISO("2022-07-07T19:00"),
      () => callback("Cyan")
    ),
    new CalendarEvent(
      "Five",
      "Dummy Data",
      "rgb(255 0 255 / 50%)",
      DateTime.fromISO("2022-07-07T10:00"),
      DateTime.fromISO("2022-07-07T22:00"),
      () => callback("Magenta")
    ),
    new CalendarEvent(
      "Six",
      "Dummy Data",
      "rgb(10 120 120 / 50%)",
      DateTime.fromISO("2022-07-07T00:00"),
      DateTime.fromISO("2022-07-07T05:00"),
      () => callback("Teal")
    ),
  ];
  return testEvents;
}

export default function demoApp() {
  let events = generateEvents();

  return {
    events,
  };
}
