import uuidv4 from "../../node_modules/uuid/dist/esm-browser/v4.js"

export default class EmptyCell {
  Id;
  Callback;
  constructor(callback) {
    this.Id = uuidv4();
    this.Callback = () => callback;
  };

  BuildCell(evenOdd) {
    return `
    <div id="${this.Id}" class="cell-${evenOdd} p-1 button">
     
    </div>
    `
  };

}