export const marker = {
  mark(obj) {
    this.marker.x(obj.x());
    this.marker.y(obj.y());
    this.marker.height(obj.height());
    this.marker.width(obj.width());
  },

  resetMark() {
    this.marker.x(0);
    this.marker.y(0);
    this.marker.height(0);
    this.marker.width(0);
  },

  hideAnchor() {
    this.editor.find(".anchor").forEach((el) => {
      el.hide();
    });
  },

  clearIntervals() {
    if (!window.lableBakerIntervals) {
      return;
    }
    for (let i = 0; i < window.lableBakerIntervals.length; i++) {
      clearInterval(window.lableBakerIntervals[i]);
    }
  },

  clearAll() {
    this.clearEditor();
    this.medias.forEach(media => {
      media.pause()
    })
    document.dispatchEvent(this.selectEvent);
  },

  clearEditor() {
    this.layer.children.forEach((item) => {
      setTimeout(() => {
        if (item.getClassName() === "Transformer") {
          return;
        }
        item.destroy();
      }, 100);
    });

    this.backgroundLayer.children.forEach((item) => {
      setTimeout(() => {
        if (item.name() === "stageBackground") {
          return;
        }
        item.destroy();
      }, 100);
    });
    this.transform.nodes([]);
    this.selectEvent.data = null;
  }
}; 