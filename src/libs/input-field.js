export default class InputField {
    constructor(editor, textNode , inputType = 'input') {
        this.stage = editor.editor;
        this.textNode = textNode;
        this.containerWrapper = editor.containerWrapper
        this.editor = editor;
        this.inputType = inputType;
    }

    apply() {

    

        const textNode = this.textNode;

        const stage = this.stage;
        // hide text node and transformer:
        textNode.hide();


        // create inputElement over canvas with absolute position
        // first we need to find position for inputElement
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = textNode.absolutePosition();

        // so position of inputElement will be the sum of positions above:
        var areaPosition = {
            x: stage.container().offsetLeft + textPosition.x,
            y: stage.container().offsetTop + textPosition.y,
        };

        // create inputElement and style it
        var inputElement = document.createElement(this.inputType);
     

        document.getElementById(this.containerWrapper).appendChild(inputElement);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the inputElement can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        inputElement.value = textNode.text();
        inputElement.style.position = 'absolute';
        inputElement.style.zIndex = '9999999999999999';
        inputElement.style.top = areaPosition.y + 'px';
        inputElement.style.left = areaPosition.x + 'px';
        inputElement.style.width = textNode.width() + 'px';
        inputElement.style.maxWidth = textNode.width() + 'px';
        inputElement.style.height = textNode.height() + 'px';
        inputElement.style.maxHeight = textNode.height() + 'px';
        inputElement.style.fontSize = textNode.fontSize() + 'px';
        inputElement.style.border = 'none';
        inputElement.style.padding = '0px';
        inputElement.style.margin = '0px';
        inputElement.style.overflow = 'hidden';
        inputElement.style.background = 'none';
        inputElement.style.outline = 'none';
        inputElement.style.resize = 'none';
        inputElement.style.lineHeight = textNode.lineHeight();
        inputElement.style.fontFamily = textNode.fontFamily();
        inputElement.style.transformOrigin = 'left top';
        inputElement.style.textAlign = textNode.align();
        inputElement.style.color = textNode.fill();
        // const rotation = textNode.rotation();
        // var transform = '';
        // if (rotation) {
        //     transform += 'rotateZ(' + rotation + 'deg)';
        // }

        // var px = 0;
        // // also we need to slightly move inputElement on firefox
        // // because it jumps a bit
        // var isFirefox =
        //     navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        // if (isFirefox) {
        //     px += 2 + Math.round(textNode.fontSize() / 20);
        // }
        // transform += 'translateY(-' + px + 'px)';

        // Set the scale values for scaleX and scaleY
        const scaleXValue = this.editor.editor.scaleX(); // This will scale the inputElement horizontally to twice its original size
        const scaleYValue = this.editor.editor.scaleY(); // This will scale the inputElement vertically to 1.5 times its original size

        // Set the scaleX and scaleY values using the style property
        inputElement.style.transform = `scaleX(${scaleXValue}) scaleY(${scaleYValue})`;

        // inputElement.style.transform = transform;

        // reset height
        inputElement.style.height = 'auto';
        // after browsers resized it we can set actual value
        inputElement.style.height = inputElement.scrollHeight + 3 + 'px';

        inputElement.focus();

        function removeinputElement() {
            inputElement.parentNode.removeChild(inputElement);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();

        }

        function setinputElementWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            inputElement.style.width = newWidth + 'px';
        }

        inputElement.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(inputElement.value);
                removeinputElement();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeinputElement();
            }
        });

        inputElement.addEventListener('keydown', function (e) {
            const scale = textNode.getAbsoluteScale().x;
            setinputElementWidth(textNode.width() * scale);
            inputElement.style.height = 'auto';
            inputElement.style.height =
                inputElement.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== inputElement) {
                textNode.text(inputElement.value);
                removeinputElement();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    }
}