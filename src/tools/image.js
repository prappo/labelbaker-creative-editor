import Core from '../init';

export default function Image(config) {
    var imageObj = new Image();
    imageObj.onload = function () {
        var image = new Core.Image({
            x: 1,
            y: 1,
            image: imageObj,
            width: 100,
            height: 100
        });
    };
    imageObj.src = 'https://raw.githubusercontent.com/prappo/prappo/master/images/placeholder.png';
    return imageObj;
}
