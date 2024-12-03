export const utils = {
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  },

  getSize() {
    let size = this.editorHeight / 3;
    if (this.editorHeight > this.editorWidth) {
      size = this.editorWidth / 3;
    }
    return size;
  },

  getYCenter(height, extra = 0) {
    if (extra > 0) {
      extra = height / 2;
    }
    return this.editorHeight / 2 - height / 2 + extra;
  },

  getXCenter(width, extra = 0) {
    if (extra > 0) {
      extra = width / 2;
    }
    return this.editorWidth / 2 - width / 2 + extra;
  },

  calculateNewSize(originalWidth, originalHeight, desiredWidth) {
    var aspectRatio = originalWidth / originalHeight;
    var newHeight = desiredWidth / aspectRatio;
    return {
      width: desiredWidth,
      height: newHeight,
    };
  }
}; 