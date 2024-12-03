import { applyAnimation } from "../libs/animation";
import URLControl from "../libs/url";

export const events = {
  onClick(object) {
    this.selected = object;
    this.selectEvent.data = object;
    this.selectItem(object);
    document.dispatchEvent(this.selectEvent);

    if (this.readOnly) {
      if (object.attrs?.onClickAction) {
        switch (object.attrs.onClickAction) {
          case "showHide":
            this.showHide(object, "onclick_");
            break;

          case "goToLink":
            URLControl.goToURL(object);
            break;
        }
      }

      this.manipulateTarget('onclick_', object);

      if (object.attrs?.onclickanimationEnable) {
        this.animate(object, "onclick");
      }

      if (object.attrs.type === 'text' && object.attrs.inputField) {
        (new this.InputField(this, object)).apply()
      }
    }

    if (!this.lockedItems.includes(object)) {
      if (!this.readOnly) {
        this.transform.nodes([object]);
      }
    } else {
      this.transform.nodes([]);
    }
  },

  onMouseenter(object) {
    if (this.readOnly) {
      if (object.attrs?.onClickAction) {
        this.editor.container().style.cursor = "pointer";
        URLControl.showPointerCursor(this.editor, object);
      }

      if (object.attrs?.hoveranimationEnable) {
        this.animate(object, "hover");
      }
    }
  },

  onMouseleave(object) {
    this.editor.container().style.cursor = "default";
    if (this.readOnly) {
      if (object.attrs?.hoveranimationEnable) {
        // object.tween.reverse();
      }
    }
  },

  onDobleClick(object) {
    if (object.attrs.type === 'text' && !this.readOnly) {
      (new this.InputField(this, object, 'textarea')).apply()
    }
  },

  animate(object, animationFor) {
    if (object.attrs?.[animationFor + "animationEnable"] ?? false) {
      let animationType = object.attrs?.[animationFor + "animationType"] ?? "default";

      if (animationType === "default") {
        if (object.getAttr(animationFor + "animation")) {
          applyAnimation(this.editor, this.layer, object.getAttr(animationFor + "animation"), object);
        }
      }

      if (animationType === "custom") {
        // Custom animation logic here
        // ... (rest of the animation code)
      }
    }
  }
}; 