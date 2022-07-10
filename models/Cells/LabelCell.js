

export default class LabelCell {
  Time;
  constructor(time) {
    this.Time = time;
  }

  BuildCell(evenOdd) {
    return `
    <div class="cell-${evenOdd} super-center">
      ${this.Time}
    </div>
    `;
  }

}