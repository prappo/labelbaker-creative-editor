export default function snapping(stage, layer, tr) {

    var GUIDELINE_OFFSET = 5;
    // were can we snap our objects?
    function getLineGuideStops(skipShape) {
        // we can snap to stage borders and the center of the stage
        var vertical = [0, stage.width() / 2, stage.width()];
        var horizontal = [0, stage.height() / 2, stage.height()];

        // and we snap over edges and center of each object on the canvas
        stage.find('Text,Rect,Circle,Image,Polygon,Star,RegularPolygon,Arc,Ellipse,Line').forEach((guideItem) => {



            if (guideItem === skipShape) {
                return;
            }
            let ingnoreNames = [
                'selectionRectangle',
                'stageBackground',
                'top-left _anchor',
                'top-center _anchor',
                'top-right _anchor',
                'middle-right _anchor',
                'middle-left _anchor',
                'bottom-left _anchor',
                'bottom-center _anchor',
                'bottom-right _anchor',
                'rotater _anchor',
                'transform',
            ]
            if (ingnoreNames.includes(guideItem.name())) {
                return;
            }


            var box = guideItem.getClientRect();
            // and we can snap to all edges of shapes
            vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
            horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
        });
        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    }

    // what points of the object will trigger to snapping?
    // it can be just center of the object
    // but we will enable all edges and center
    function getObjectSnappingEdges(node) {
        var box = node.getClientRect();
        var absPos = node.absolutePosition();

        return {
            vertical: [
                {
                    guide: Math.round(box.x),
                    offset: Math.round(absPos.x - box.x),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.x + box.width / 2),
                    offset: Math.round(absPos.x - box.x - box.width / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.x + box.width),
                    offset: Math.round(absPos.x - box.x - box.width),
                    snap: 'end',
                },
            ],
            horizontal: [
                {
                    guide: Math.round(box.y),
                    offset: Math.round(absPos.y - box.y),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.y + box.height / 2),
                    offset: Math.round(absPos.y - box.y - box.height / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.y + box.height),
                    offset: Math.round(absPos.y - box.y - box.height),
                    snap: 'end',
                },
            ],
        };
    }

    // find all snapping possibilities
    function getGuides(lineGuideStops, itemBounds) {
        var resultV = [];
        var resultH = [];

        lineGuideStops.vertical.forEach((lineGuide) => {
            itemBounds.vertical.forEach((itemBound) => {
                var diff = Math.abs(lineGuide - itemBound.guide);

                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < GUIDELINE_OFFSET) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        lineGuideStops.horizontal.forEach((lineGuide) => {
            itemBounds.horizontal.forEach((itemBound) => {
                var diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        var guides = [];

        // find closest snap
        var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
        var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
        if (minV) {
            guides.push({
                lineGuide: minV.lineGuide,
                offset: minV.offset,
                orientation: 'V',
                snap: minV.snap,
            });
        }
        if (minH) {
            guides.push({
                lineGuide: minH.lineGuide,
                offset: minH.offset,
                orientation: 'H',
                snap: minH.snap,
            });
        }
        return guides;
    }

    function drawGuides(guides) {
        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                var line = new Konva.Line({
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 0.5,
                    name: 'guid-line',
                    dash: [2, 2],
                });
                layer.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                var line = new Konva.Line({
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 0.5,
                    name: 'guid-line',
                    dash: [2, 2],
                });
                layer.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    }

    layer.on('dragmove', function (e) {
        try {
            // clear all previous lines on the screen
            layer.find('.guid-line').forEach((l) => l.destroy());
            // find possible snapping lines
            var lineGuideStops = getLineGuideStops(e.target);
            // find snapping points of current object
            var itemBounds = getObjectSnappingEdges(e.target);

            // now find where can we snap current object
            var guides = getGuides(lineGuideStops, itemBounds);

            // do nothing of no snapping
            if (!guides.length) {
                return;
            }

            drawGuides(guides);

            var absPos = e.target.absolutePosition();
            // now force object position
            guides.forEach((lg) => {
                switch (lg.snap) {
                    case 'start': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'center': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'end': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                }
            });
            e.target.absolutePosition(absPos);
        } catch (error) {

        }
    });

    layer.on('dragend', function (e) {
        try {
            // clear all previous lines on the screen
            layer.find('.guid-line').forEach((l) => l.destroy());
        } catch (error) {

        }
    });
}