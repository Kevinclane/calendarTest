

export default class Cell {

    CalendarEvent;
    RandomNumber

    constructor(calendarEvent) {
        this.CalendarEvent = calendarEvent;
        this.RandomNumber = Math.floor(Math.random() * 1000);
    }

    BuildCell = (evenOdd) => {

        let template = `
          <div 
          id="${this.CalendarEvent.Id + this.RandomNumber}"
           class="cell-${evenOdd} button" style="background-color:${this.CalendarEvent.Color
        }">
            ${this.CalendarEvent.Description}
            <div>
            Start Time: ${this.CalendarEvent.StartTime.toFormat("hh:mm")}
            </div>
            <div>
            End Time: ${this.CalendarEvent.EndTime.toFormat("hh:mm")}
            </div>
          </div>
        `;
        return template;
    }

    SetCallback() {
        document.getElementById(this.CalendarEvent.Id + this.RandomNumber).addEventListener("click", this.CalendarEvent.Callback);
    }

}