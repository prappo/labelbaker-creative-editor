export default class URL {

    static showPointerCursor(editor, object) {
        if (object.attrs.url) {
            if (object.attrs.url.length > 0) {
                editor.container().style.cursor = 'pointer';
            }
        }
    }

    static goToURL(object) {
        if (object.attrs.url) {
            if (object.attrs.url.length > 0) {
                window.open(object.attrs.url, '_blank');
            }
        }
    }
}