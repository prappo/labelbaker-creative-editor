export default class History {
  constructor(editor) {
    this.editor = editor;
    this.history = [];
    this.step = 0;
  }

  addHistory(data) {
    // let data = {}
    // data.item = item;
    // data.attr = attr;
    // data.status = status;
    // data.type = typeof attr; // Ex. Object , string etc...
    // data.value = this.formatValue(item, attr);
    // data.previous = previous;
    if (this.history.length > 5) {
      this.delete(0);
    }
    this.history.push(data);
    // this.step++;
    // this.step = 0;
  
  }

  formatValue(item, attr) {
    if (typeof attr === "object") {
      if (attr.includes("x") || attr.includes("scaleX")) {
        return [item[attr[0]](), item[attr[1]]()];
      }
    }

    return item[attr]();
  }

  delHistory() {
    this.history.pop();
  }

  delete(index) {
    this.history.splice(index, 1);
  }

  undo() {
   
    if (this.history.length === 0) {
      this.step = 0;
    
    }

    if (this.step === 0) {
      this.step = this.history.length - 2;
    }
    if (this.step === -1) {
      this.step = this.history.length;
    }
    
    this.applyChange(this.step);

    this.step--;

  }

  redo() {}

  clearHistory() {
    this.history.length = 0;
  }

  applyChange(index) {
    if (this.history[index]) {
      let changeItem = JSON.parse(this.history[index]);
    
      this.editor.clearAll();
      this.editor.ImportData.source(changeItem);
    }
  }

  revert(index) {
    let changeItem = this.history[index];
    changeItem.item[changeItem.attr](changeItem.previous);
  }

  applyChanges() {
    let data = this.history[this.step];
   
    try {
      if (typeof data.item[data.attr] === "function") {
        data.item[data.attr](data.value);
        this.delHistory();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
