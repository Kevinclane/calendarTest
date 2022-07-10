import uuidv4 from "../../node_modules/uuid/dist/esm-browser/v4.js"

export default class BodyCell {

    Id;
    CalendarEvents;
    DateTime;

    constructor(calendarEvents, cellTime) {
        this.Id = uuidv4();
        this.CalendarEvents = calendarEvents;
        this.DateTime = cellTime;
    };


    //!TODO Need to remove the hard coded 0 index 
    BuildCell = (evenOdd) => {
        let template = `
          <div 
          id="${this.CalendarEvents[0].Id + this.Id}"
           class="cell-${evenOdd} button" style="background-color:${this.CalendarEvents[0].Color
            }">
            ${this.CalendarEvents[0].Description}
            <div>
            Start Time: ${this.CalendarEvents[0].StartTime.toFormat("hh:mm")}
            </div>
            <div>
            End Time: ${this.CalendarEvents[0].EndTime.toFormat("hh:mm")}
            </div>
          </div>
        `;
        return template;
    };

    SetCallback() {
        document.getElementById(this.CalendarEvents[0].Id + this.Id).addEventListener("click", this.CalendarEvents[0].Callback);
    };

}