import * as luxon from "../node_modules/luxon/build/es6/luxon.js";

export default class CalendarEvent {
  Id;
  Name;
  Description;
  Color;
  StartTime;
  EndTime;
  Interval;
  Callback;

  constructor(id, name, description, color, startTime, endTime, callback) {
    this.Id = id ? id : Date.now();
    this.Name = name;
    this.Description = description;
    this.Color = color;
    this.StartTime = startTime;
    this.EndTime = endTime;
    this.Interval = luxon.Interval.fromDateTimes(startTime, endTime.minus({ millisecond: 1 }))
    this.Callback = callback;
  }


}