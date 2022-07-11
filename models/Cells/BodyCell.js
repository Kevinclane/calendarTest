import uuidv4 from "../../node_modules/uuid/dist/esm-browser/v4.js"

export default class BodyCell {

    Id;
    CalendarEvents;
    DateTime;
    EventWidth;
    DayEvents;

    constructor(calendarEvents, cellTime, dayEvents = []) {
        this.Id = uuidv4();
        this.CalendarEvents = calendarEvents;
        this.DateTime = cellTime;
        this.DayEvents = dayEvents;
        this.EventWidth = 100 / dayEvents.length
    };



    BuildCell = (evenOdd) => {
        let template = `<div class="cell-${evenOdd} d-flex">`;

        let i = 0;
        while(i < this.DayEvents.length) {

            let currentEvent = this.CalendarEvents.find(ce => ce == this.DayEvents[i]);
            if(!currentEvent) {
                template += `
                    <div style="width:${this.EventWidth}%">

                    </div>
                `;
            } else {
                template += `
                <div 
                    id="${currentEvent.Id + this.Id}"
                    class="button super-center py-1" style="background-color:${currentEvent.Color};width:${this.EventWidth}%">
                </div>
                `;
            }
            i++;
        };

        template += `</div>`;
        // debugger
        return template;
    };

    SetCallback() {
        let i = 0;
        while(i < this.CalendarEvents.length) {
            document.getElementById(this.CalendarEvents[i].Id + this.Id).addEventListener("click", this.CalendarEvents[i].Callback);
            i++;
        }
    };

}