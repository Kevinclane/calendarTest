import * as DataConstants from "../../DataConstants.js";

export default class TitleCell {
  Id;
  DateTime;
  Color;
  Events;

  constructor(dateTime, events, color) {
    this.Id = Math.floor(Math.random() * 100000);
    this.DateTime = dateTime;
    this.Events = events;
    this.Color = color ? color : DataConstants.DEFAULT_TITLE_COLOR;
  };

  BuildCell() {
    if (this.DateTime) {
      return `
      <div class="super-center flex-column table-header-cell" style="background-color:${this.Color}">
        <div>
          ${this.DateTime.toFormat("MM/dd")}
        </div>
        <div>
          ${this.DateTime.weekdayShort}
        </div>
      </div>
      `;
    } else {
      return `
      <div class="table-header-cell"
      style="background-color:${this.Color}">
      </div>
      `;
    }
  }

}