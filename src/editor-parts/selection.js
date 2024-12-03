export const selection = {
  selectItem(item) {
    this.selected = item;
    this.selectEvent.data = item;
    document.dispatchEvent(this.selectEvent);
  },

  deselect() {
    this.resetMark();
    this.transform.nodes([]);
    this.selectEvent.data = null;
    document.dispatchEvent(this.selectEvent);
  },

  deleteSelected() {
    try {
      this.transform.nodes().forEach((el) => el.destroy());
      this.transform.nodes([]);
      this.selectEvent.data = null;
      document.dispatchEvent(this.selectEvent);
    } catch (err) {}
  },

  duplicateSelected() {
    try {
      let els = [];
      this.transform.nodes().forEach((el) => {
        let cloned = el.clone({
          x: el.x() + 10,
          y: el.y() + 10,
        });
        cloned.name(
          cloned.name() +
          "_duplicate_" +
          Math.floor(Math.random() * (99 - 10 + 1) + 10)
        );
        this.layer.add(cloned);
        els.push(cloned);
      });
      this.selectItem(els);
      this.transform.nodes(els);
    } catch (err) {}
  },

  isLocked() {
    return this.lockedItems.includes(this.selected);
  },

  lockUnlock() {
    if (this.lockedItems.includes(this.selected)) {
      let index = this.lockedItems.indexOf(this.selected);
      if (index > -1) {
        this.lockedItems.splice(index, 1);
      }
      this.transform.nodes([this.selected]);
      this.selected.draggable(true);
    } else {
      this.lockedItems.push(this.selected);
      this.transform.nodes([]);
      this.selected.draggable(false);
    }
  }
}; 