import * as luxon from "../node_modules/luxon/build/es6/luxon.js";

export default class CalendarEvent {
  Name;
  Description;
  Color;
  StartTime;
  EndTime;
  Interval;
  Callback;
  constructor(name, description, color, startTime, endTime, callback) {
    this.Name = name;
    this.Description = description;
    this.Color = color;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.Interval = luxon.Interval.fromDateTimes(startTime, endTime.minus({ millisecond: 1 }))
    this.Callback = callback;

    this.runCallback = () => {
      this.Callback();
    }
  }


}