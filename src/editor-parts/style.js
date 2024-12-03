export const style = {
  copyStyle() {
    this.copiedStyle = JSON.parse(JSON.stringify(this.selected.getAttrs()));
  },

  filterStyle(attrs) {
    let blackList = ["name", "image", "id", "x", "y"];
    for (let key in attrs) {
      if (typeof this.selected[key] !== "function") {
        delete attrs[key];
      } else {
        if (blackList.includes(key)) {
          delete attrs[key];
        }
      }
    }
    return attrs;
  },

  pasteStyle() {
    if (this.selected) {
      let attrs = {
        ...this.selected.attrs,
        ...this.filterStyle(this.copiedStyle),
      };
      this.selected.setAttrs(attrs);
    } else {
      alert("You can't paste style on multiple selection");
    }
  }
}; 