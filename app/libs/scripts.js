export const countdown = {
    id: 12333,
    name: 'Countdown',
    fields: [
        {
            id: 'day_field',
            value: '',
            label: 'Day Output',
            type: 'select',
            kind: 'Text',
        },
        {
            id: 'hour_field',
            value: '',
            label: 'Hour Output',
            type: 'select',
            kind: 'Text',
        },
        {
            id: 'minute_field',
            value: '',
            label: 'Minute Output',
            type: 'select',
            kind: 'Text',
        },
        {
            id: 'seconds_field',
            value: '',
            label: 'Seconds Output',
            type: 'select',
            kind: 'Text',
        },
        {
            id: 'date_field',
            value: '',
            label: 'Target Date',
            type: 'date',

        },

    ],
    run() {

        const countdown = (targetDate) => {
            function updateCountdown() {
                const targetTime = new Date(targetDate).getTime();
                const now = new Date().getTime();
                const timeRemaining = targetTime - now;

                if (timeRemaining <= 0) {
                    clearInterval(intervalId);
                    return {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    };
                }

                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                return {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                };
            }

            const daysField = labelbakerCanvas.editor.find('.' + this.fields[0].value);
            const hoursField = labelbakerCanvas.editor.find('.' + this.fields[1].value);
            const minutesField = labelbakerCanvas.editor.find('.' + this.fields[2].value);
            const secondsField = labelbakerCanvas.editor.find('.' + this.fields[3].value);

            const intervalId = setInterval(() => {
                const remainingTime = updateCountdown();


                if (daysField.length > 0) {

                    daysField[0].text(remainingTime.days)
                }

                if (hoursField.length > 0) {

                    hoursField[0].text(remainingTime.hours)
                }

                if (minutesField.length > 0) {

                    minutesField[0].text(remainingTime.minutes)
                }

                if (secondsField.length > 0) {

                    secondsField[0].text(remainingTime.seconds)
                }
            }, 1000); // Update the countdown every second

            // Return the interval ID, so you can use clearInterval if needed
            return intervalId;
        }

        // Example usage:
        const targetDate = this.fields[4].value; // Replace this with your target date

        if (targetDate) {
            const intervalId = countdown(targetDate);

            window.lableBakerIntervals.push(intervalId);
        }

    }
}

export const incrementAndDecrement = {
    id: 234,
    name: 'Increment & Decrement',
    fields: [
        {
            id: 'increment_field',
            value: '',
            label: 'Increment Field',
            type: 'select',
            // kind: 'Text,Circle,Line,Arc',
            kind: 'Text',
        },
        {
            id: 'decrement_field',
            value: '',
            label: 'Decrement Field',
            type: 'select',
            kind: 'Text',
        },
        {
            id: 'increment_btn',
            value: '',
            label: 'Increment Button',
            type: 'select',

        },
        {
            id: 'decrement_btn',
            value: '',
            label: 'Decrement Button',
            type: 'select',
        },

        {
            id: 'max_field',
            value: 100,
            label: 'Max Increment',
            type: 'number',
        },
        {
            id: 'min_field',
            value: 0,
            label: 'Min Decrement',
            type: 'number',
        },


    ],
    run() {
        const increment_btn = labelbakerCanvas.editor.find('.' + this.fields[2].value);
        const decrement_btn = labelbakerCanvas.editor.find('.' + this.fields[3].value);
        const increment_field = labelbakerCanvas.editor.find('.' + this.fields[0].value);
        const decrement_field = labelbakerCanvas.editor.find('.' + this.fields[1].value);
        let count = 0

        // incremnet click
        if (increment_btn.length > 0) {
            increment_btn[0].on('mouseenter', () => {
                labelbakerCanvas.editor.container().style.cursor = "pointer"
            })
            increment_btn[0].on('click', () => {

                if (increment_field.length > 0) {


                    let iField = increment_field[0];


                    // if text field


                    if (iField.attrs.type === 'text') {

                        count = parseInt(iField.text());
                        if (count == NaN) {
                            iField.text(0);
                            count = 0;
                        }

                        if (parseInt(this.fields[4].value) > count) {

                            count++;
                        }


                        iField.text(count);
                    }

                    // if circle
                    if (iField.attrs.type === 'circle') {

                        count = parseInt(iField.radius());


                        if (parseInt(this.fields[4].value) > count) {

                            count++;
                        }


                        iField.radius(count);
                    }

                    // If line
                    if (iField.attrs.type === 'line') {

                        count = parseInt(iField.x());

                        let width = iField.width();
                        if (parseInt(this.fields[4].value) > count) {

                            count++;
                        }


                        iField.x(count);
                        iField.width(width++)
                    }




                }
            })
        }

        // decrement click
        if (decrement_btn.length > 0) {
            decrement_btn[0].on('mouseenter', () => {
                labelbakerCanvas.editor.container().style.cursor = "pointer"
            })
            decrement_btn[0].on('click', () => {

                if (decrement_field.length > 0) {

                    let dField = decrement_field[0];

                    count = parseInt(dField.text());
                    if (count == NaN) {
                        dField.text(0);
                        count = 0;
                    }

                    if (parseInt(this.fields[5].value) < count) {
                        count--;
                    }

                    dField.text(count);

                }
            })
        }
    }
}

export const addToCartFunc = {
    id: "1691674982111",
    name: "Add to cart",
    description: "",
    fields: [{ "id": "product_id", "value": "111", "label": "Product ID", "type": "number" }, { "id": "cart_count", "value": "Cart_count", "label": "Cart count field", "type": "select", "kind": "Text" }, { "id": "cart_button", "value": "Cart_button", "label": "Cart Button", "type": "select" }],
    run() {
        const addToCart = (productId, quantity) => {
            fetch(window.location.origin + `/?add-to-cart=${productId}&quantity=${quantity}`).then(e => {
                console.log(e)
            })

        }

        const cartButton = labelbakerCanvas.editor.find('.' + this.fields[2].value);

        // decrement click
        if (cartButton.length > 0) {
            cartButton[0].on('mouseenter', () => {
                labelbakerCanvas.editor.container().style.cursor = "pointer"
            })
            cartButton[0].on('click', () => {
                const quantityFiled = labelbakerCanvas.editor.find('.' + this.fields[1].value);
                let quantity = 1;
                if (quantityFiled.length > 0) {
                    quantity = quantityFiled[0].text();
                }
                addToCart(this.fields[0].value, quantity)
                alert('Add to cart');
            })
        }
    }
}

export const select = {
    id: "1691687117762",
    name: "Select",
    description: "",
    fields: [
        {
            "id": "select_group",
            "value": "",
            "label": "Select Group",
            "type": "select",
            "kind": "Group"
        },
        {
            id: "act_as",
            value: "radio",
            label: "Act as",
            data: [
                {
                    key: 'radio',
                    value: 'Radio'
                },
                {
                    key: 'checkbox',
                    value: 'Checkbox'
                }
            ],
            type: "select",
        },
        {
            id: "selection_width",
            value: "1",
            label: "Selection Thickness",
            type: "number",
        },
        {
            id: "selection_color",
            value: "#3F83F8",
            label: "Selection Color",
            type: "color",
        },
        {
            id: "selection_type",
            value: "border",
            label: "Act as",
            data: [
                {
                    key: 'border',
                    value: 'Border'
                },
                {
                    key: 'fill',
                    value: 'Fill'
                }
            ],
            type: "select",
        },
        {
            id: "deselected_fill_color",
            value: "#3F83F8",
            label: "Deselect Color",
            type: "color",
        },
    ],
    run() {
        let selected = null;

        let stroke = this.fields[2].value;
        let groupNameToFind = this.fields[0].value;
        let actAs = this.fields[1].value;
        let color = this.fields[3].value;
        let foundGroup = labelbakerCanvas.layer.find(node => node.name() === groupNameToFind && node instanceof Konva.Group)[0];
        if (foundGroup) {

            const toggleDataInArray = (arr, data) => {
                // Check if data exists in the array
                const index = arr.indexOf(data);

                if (index !== -1) {
                    // If data exists, remove it
                    arr.splice(index, 1);
                } else {
                    // If data doesn't exist, add it
                    arr.push(data);
                }

                return arr;
            }

            let multiValue = []

            foundGroup.on('click', (e) => {

                selected = e.target;


                let value = selected.getAttr('value');

                if (actAs === 'radio') {
                    if (!value) {
                        value = selected.attrs.name;
                    }
                } else {
                    if (!value) {
                        value = selected.attrs.name;
                    }
                    value = toggleDataInArray(multiValue, selected.attrs.name)

                }
                foundGroup.setAttr('value', value)


                const selectionStyle = this.fields[4].value;
                const deselectColor = this.fields[5].value;

                // If radio 

                if (actAs === 'radio') {
                    foundGroup.children.forEach((el) => {

                        if (selectionStyle === 'border') {
                            if (el != selected) {
                                if (typeof el.strokeEnabled === 'function') {
                                    el.strokeEnabled(false)
                                }

                            } else {
                                el.strokeWidth(stroke);
                                el.stroke(color)
                                if (typeof el.strokeEnabled === 'function') {
                                    el.strokeEnabled(true)
                                }

                            }
                        }else{

                            if (el != selected) {
                                el.fill(deselectColor)

                            } else {
                                el.fill(color)

                            }

                        }


                    })



                } else {

                    foundGroup.children.forEach((el) => {

                        if(selectionStyle === 'border'){
                            if (el == selected) {

                                if (multiValue.includes(el.name())) {
    
                                    el.strokeWidth(stroke);
                                    el.stroke(this.fields[3].value)
                                    if (typeof el.strokeEnabled === 'function') {
                                        el.strokeEnabled(true)
                                    }
                                } else {
                                    if (typeof el.strokeEnabled === 'function') {
                                        el.strokeEnabled(false)
                                    }
    
    
                                }
    
    
                            }
                        }else{
                            if (el == selected) {

                                if (multiValue.includes(el.name())) {
    
                                    el.fill(deselectColor)
                                } else {
                                    el.fill(color)
    
    
                                }
    
    
                            }
                        }
                        

                    })

                }


            })
        }
    }
}