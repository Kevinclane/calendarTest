//3rd party
import * as luxon from "../node_modules/luxon/build/es6/luxon.js";
let DateTime = luxon.DateTime;

//internal
import {
  millFromSeconds,
  millFromMinutes,
  millFromHours,
  millFromDays,
  millFromWeeks,
} from "../calculators/MillisecondCalculator.js";
import BodyCell from "../models/Cells/BodyCell.js";
import TitleCell from "../models/Cells/TitleCell.js";
import LabelCell from "../models/Cells/LabelCell.js";
import * as DataConstants from "../DataConstants.js";
import EmptyCell from "../models/Cells/EmptyCell.js";

export function setDaysOfWeek(primaryDate) {
  let dayMilliseconds = millFromDays(1);
  let startOfWeek = DateTime.fromISO(primaryDate)
    .startOf("week")
    .minus(dayMilliseconds);

  let days = [];
  let i = 0;
  while (i < 7) {
    let nextDayMilliseconds = dayMilliseconds * (i + 1);
    let day = startOfWeek.plus(nextDayMilliseconds);
    days.push(day);
    i++;
  };

  return days;
};

export function generateTitleCells(daysOfTheWeek, events) {

  let cells = [];
  //First cell is always blank
  cells.push(new TitleCell(null, null));

  let i = 0;
  while (i < daysOfTheWeek.length) {
    let daysEvents = events.filter(e => daysOfTheWeek[i].hasSame(e.StartTime, "day"));
    cells.push(new TitleCell(daysOfTheWeek[i], daysEvents, null));
    i++;
  };

  return cells;

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
  cellTime = cellTime.plus({
    hour,
    minute,
  });

  return cellTime;
}

function generateRowOfCells(events, time, titleCells) {
  let labelCell = new LabelCell(time);
  let rowCells = [];

  //start at 1 because the first title cell is blank
  let i = 1;
  while (i < titleCells.length) {
    let cellTime = getCellTime(time, titleCells[i].DateTime);
    let cellEvents = events.filter((e) => e.Interval.contains(cellTime));

    if (cellEvents.length > 0) {
      let cell = new BodyCell(cellEvents, cellTime, titleCells[i].Events);
      rowCells.push(cell);
    } else {
      //!TODO This null value will be a callback function
      let cell = new EmptyCell(null);
      rowCells.push(cell);
    }
    i++;
  };
  rowCells.unshift(labelCell);
  return rowCells;
}

export function generateBodyCellRows(events, yAxisLabels, daysOfTheWeek) {
  let cells = [];

  let i = 0;
  while (i < yAxisLabels.length) {
    let rowCells = generateRowOfCells(events, yAxisLabels[i], daysOfTheWeek);
    cells.push(rowCells);
    i++;
  };

  return cells;
};

export function generateBodyCellColumns(events, yAxisLabels, daysOfTheWeek) {
  //get all events for a particular day
  //
}

export function generateYAxisLabelNames(hourDividend) {
  let amHours = [];
  let pmHours = [];
  let i = 0;

  while (i < DataConstants.HOURS.length) {
    let x = 0;
    while (x < hourDividend) {
      let minutes = (60 / hourDividend) * x;
      if (minutes == "0") {
        minutes += "0";
      }

      amHours.push(DataConstants.HOURS[i] + ":" + minutes + " am");
      pmHours.push(DataConstants.HOURS[i] + ":" + minutes + " pm");
      x++;
    }
    i++;
  }

  return amHours.concat(pmHours);
}

export function setCallbacks(cells) {
  let i = 0;
  while (i < cells.length) {
    if (cells[i].CalendarEvents) {
      let x = 0;
      while (x < cells[i].CalendarEvents.length) {
        let event = cells[i].CalendarEvents[x];
        document.getElementById(event.Id + cells[i].Id).addEventListener("click", event.Callback);
        x++;
      }
    } else if (cells[i].Callback) {
      document.getElementById(cells[i].Id).addEventListener("click", cells[i].Callback);
    };
    i++;
  }
}