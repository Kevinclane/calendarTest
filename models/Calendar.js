
export default class Calendar {

    Cells;

    constructor(cells) {
        this.Cells = cells;
    };

    //Is this redundant?
    addCells(cells) {
        this.Cells.push(cells);
    };

    

}