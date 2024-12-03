export const group = {
  addGroup(group) {
    return new Promise((resolve, reject) => {
      if (group?.children) {
        let newGroup = new this.Konva.Group(group.attrs);
        this.groupCount++;
        newGroup.name(group.attrs.name);
        group.children.forEach((el, index) => {
          let functionName = this.ImportData.makeFunctionName(el);
          if (typeof this[functionName] === "function") {
            try {
              if (el.attrs.type == 'image') {
                this[functionName](el.attrs).then(ee => {
                  newGroup.add(ee);
                })
              } else {
                newGroup.add(this[functionName](el.attrs));
              }
            } catch (err) {
              console.log(err)
            }
          }
        });

        this.layer.add(newGroup);
        this.onLoad(newGroup);
        resolve();
      }
      reject();
    });
  },

  groupSelected() {
    try {
      let nodes = this.transform.nodes();
      if (nodes.length > 1) {
        this.groupCount++;
        let group = new this.Konva.Group({
          x: 0,
          y: 0,
          type: "group",
          draggable: true,
        });

        group.name("Group " + this.groupCount);

        nodes.forEach((el) => {
          group.add(el);
        });

        group.on("click tap", () => {
          this.selected = group;
          document.dispatchEvent(this.selectEvent);
        });

        this.layer.add(group);
      }
    } catch (err) {}
  }
}; 