// import jsPDF from 'jspdf';
import { jsPDF } from "jspdf";
export class Print {
  constructor(config) {
    this.doc = new jsPDF(config.docSize);
    this.config = config;
    this.pageWidth = config.pageWidth;
    this.pageHeight = config.pageHeight;
    this.pageMargin = config.pageMargin;
    this.pageWidth -= this.pageMargin * 2;
    this.pageHeight -= this.pageMargin * 2;

    this.pageMarginLeft = config.pageMarginLeft;
    this.pageMarginTop = config.pageMarginTop;
    this.cellPaddingLeft = config.cellPaddingLeft;
    this.cellPaddingTop = config.cellPaddingTop;
    
    this.cellPadding = config.cellPadding;
    this.cellWidth = config.cellWidth;
    this.cellHeight = config.cellHeight;
    this.startX = this.pageMarginLeft;
    this.startY = this.pageMarginTop;

  }

  createLabel(data) {
    //cell projection
    var requiredWidth = this.startX + this.cellWidth + this.cellPadding * 2;
    var requiredHeight = this.startY + this.cellHeight + this.cellPadding * 2;
    if (requiredWidth <= this.pageWidth) {
      this.#addContent(
        data,
        this.startX + this.cellPadding,
        this.startY + this.cellPadding
      );
      this.startX = requiredWidth + this.cellPaddingLeft;
    } else {
      if (requiredHeight + this.cellHeight > this.pageHeight) {
        this.doc.addPage();
        this.startY = this.pageMargin;
      } else {
        this.startY = requiredHeight + this.cellPaddingTop;
      }
      this.startX = this.pageMarginLeft;
      this.#addContent(
        data,
        this.startX + this.cellPadding,
        this.startY + this.cellPadding
      );
      this.startX = this.startX + this.cellWidth + this.cellPadding * 2 + this.cellPaddingLeft;
    }
  }

  #addContent(data, xAxis, yAxis) {
    this.doc.addImage(
      data,
      'JPEG',
      xAxis,
      yAxis,
      this.cellWidth,
      this.cellHeight
    );
  }
}
