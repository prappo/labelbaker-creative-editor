import Konva from "konva";
import './gsapplugin';
import 'https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineLite.min.js';

export function applyAnimation(stage, layer, animationName, el, duration = 1) {



    if (animationName === '--None--') {
        // clear intervals

        for (let i = 0; i < window.lableBakerIntervals.length; i++) {
            
            clearInterval(window.lableBakerIntervals[i]);

    
        }
        return;
    }

    const animationType = {
        leftToRight: (el, duration) => {

            let time = duration;

            !time ? time = 1 : time = duration;

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.position({
                x: 0,
                y: initY
            });

            el.to({
                x: initX,
                duration: time
            });

        },
        rotateExitRight: (el, duration) => {

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            let animRotate = new Konva.Animation((frame) => {
                el.rotation(frame.time % 360);
            }, layer);

            let animMove = new Konva.Animation((frame) => {
                el.x(initX + frame.time);
            }, layer);

            // animInit = true;
            animRotate.start();
            animMove.start();

            setTimeout(() => {
                animRotate.stop();
                animMove.stop();
                el.setAttrs({
                    x: initX,
                    y: initY,
                    rotation: 0
                });
                layer.draw();
            }, 2000);
        },

        fadeInItem: (el, duration) => {

            !duration && (duration = 1);

            let initItemProps = el.attrs;
            el.opacity(0);

            new Konva.Tween({
                node: el,
                easing: Konva.Easings.EaseIn,
                duration: duration,
                opacity: 1
            }).play();

        },

        easingLeftToRight: (el, duration) => {

            !duration && (duration = 1);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.position({
                x: -el.attrs.x / 2,
                y: initY
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                easing: Konva.Easings.StrongEaseOut,
                duration: duration,
            });

            el.tween.play();
        },

        spellTowardsTheScreen: (el, duration) => {

            !duration && (duration = 1);

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.StrongEaseIn,
                duration: duration,
                scaleX: 12,
                scaleY: 12,
                opacity: 0,
                onFinish: function () {
                    el.tween.reset();
                },
            });

            el.tween.play();
        },

        shrinkToCanvas: (el, duration) => {

            !duration && (duration = 1);

            el.scale({
                x: 12,
                y: 12
            });

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.StrongEaseOut,
                duration: duration,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
            });

            el.tween.play();
        },

        opacityFadeOut: (el, duration) => {

            !duration && (duration = 1);

            el.tween = new Konva.Tween({
                node: el,
                duration: duration,
                opacity: 0,
                onFinish: function () {
                    el.tween.reset();
                },
            });

            el.tween.play();
        },

        opacityFadeIn: (el, duration) => {

            !duration && (duration = 1);

            el.opacity(0);
            el.tween = new Konva.Tween({
                node: el,
                duration: duration,
                opacity: 1,
            });

            el.tween.play();
        },

        typewriting: (el, duration) => {

            !duration && (duration = 1);

            if (el.attrs.type != 'text') return;

            const textValue = el.getText();

            let i = 0;

            function typeWriter() {
                if (i <= textValue.length) {
                    el.setAttrs({
                        text: textValue.substr(0, i)
                    });
                    layer.draw();
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            typeWriter();

        },

        blurFadeIn: (el, duration) => {

            !duration && (duration = 0.6);
            el.blurRasdius(0);

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.EaseInOut,
                duration,
                blurRadius: 10,
                onFinish: function () {
                    el.filters([]);
                    el.blurRadius(0);
                    layer.add(el);
                    stage.add(layer);
                },
            }).play();

            el.cache();
            el.filters([Konva.Filters.Blur]);
            layer.add(el);
            stage.add(layer);

        },

        fallingAndBouncing: (el, duration) => {

            !duration && (duration = 1);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.position({
                x: stage.width() / 2,
                y: 0
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.BounceEaseOut,
                duration
            });

            el.tween.play();
        },

        twistyFallingAndBouncing: (el, duration) => {

            !duration && (duration = 1);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.rotate(-30);

            el.position({
                x: stage.width() / 2,
                y: 0
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.BounceEaseOut,
                duration
            });

            el.tween.play();

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.EaseInOut,
                duration: duration,
                rotation: 0
            });

            el.tween.play();

        },

        backEasingMiddleToTop: (el, duration) => {

            !duration && (duration = 0.55);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.position({
                x: stage.width() / 2,
                y: stage.height()
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.BackEaseOut,
                duration
            });

            el.tween.play();
        },

        middleToTopAndRotateClassicNegative: (el, duration) => {

            !duration && (duration = 1);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.rotate(-30);
            el.opacity(0);

            el.position({
                x: stage.width() / 2,
                y: stage.height()
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.StrongEaseOut,
                duration,
                rotation: 0,
                opacity: 1,

            });

            el.tween.play();
        },

        middleToTopAndRotateClassicPositive: (el, duration) => {

            !duration && (duration = 1);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.rotate(30);
            el.opacity(0);

            el.position({
                x: stage.width() / 2,
                y: stage.height()
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.StrongEaseOut,
                duration,
                rotation: 0,
                opacity: 1,

            });

            el.tween.play();

        },

        middleToTopAndRotateNegative: (el, duration) => {

            !duration && (duration = 1.45);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.rotate(-30);
            el.opacity(0);

            el.position({
                x: stage.width() / 2,
                y: stage.height()
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.ElasticEaseOut,
                duration,
                rotation: 0,
                opacity: 1,

            });

            el.tween.play();
        },

        middleToTopAndRotatePositive: (el, duration) => {

            !duration && (duration = 1.45);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.rotate(30);
            el.opacity(0);

            el.position({
                x: stage.width() / 2,
                y: stage.height()
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                y: initY,
                easing: Konva.Easings.ElasticEaseOut,
                duration,
                rotation: 0,
                opacity: 1,

            });

            el.tween.play();

        },

        twistyRotatedRightToTheLeft: (el, duration) => {

            !duration && (duration = 0.8);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.rotate(30);

            el.position({
                x: stage.width(),
                y: initY
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                easing: Konva.Easings.BackEaseOut,
                duration,
            });

            el.tween.play();

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.ElasticEaseOut,
                duration: duration + 1.5,
                rotation: 0
            });

            el.tween.play();

        },

        centeredResizingAndRotationingOnTheMiddle: (el, duration) => {

            !duration && (duration = 0.8);

            el.scale({
                x: 0,
                y: 0
            });

            el.rotate(30);

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.BackEaseOut,
                duration,
                scaleX: 1,
                scaleY: 1,
                rotation: 0
            });

            el.tween.play();

        },

        centeredResizingOnTheMiddle: (el, duration) => {

            !duration && (duration = 0.8);

            el.scale({
                x: 0,
                y: 0
            });

            el.tween = new Konva.Tween({
                node: el,
                easing: Konva.Easings.BackEaseOut,
                duration,
                scaleX: 1,
                scaleY: 1
            });

            el.tween.play();

        },

        easingRightToTheLeft: (el, duration) => {

            !duration && (duration = 1.5);

            let initX = el.attrs.x;
            let initY = el.attrs.y;

            el.position({
                x: stage.width() + el.attrs.x / 2,
                y: initY
            });

            el.tween = new Konva.Tween({
                node: el,
                x: initX,
                easing: Konva.Easings.StrongEaseOut,
                duration,
            });

            el.tween.play();
        },

        strobeLightEffectForText: (el, duration) => {

            const tl = new TimelineLite();
            let i = 0;
            const loop = () => {
                i++
                tl.to(el, 0.1, {
                    konva: {
                        shadowColor: 'red',
                        strokeWidth: 5,
                        shadowBlur: 0.2,
                        shadowOffsetX: 4,
                        shadowOffsetY: 0,
                        shadowOpacity: 0.5,
                    },
                    ease: Konva.Easings.Linear,
                }).to(el, 0.1, {
                    konva: {
                        shadowColor: 'black',
                        strokeWidth: 5,
                        shadowBlur: 0.2,
                        shadowOffsetX: -4,
                        shadowOffsetY: 4,
                        shadowOpacity: 0.5,
                    },
                    ease: Konva.Easings.Linear,
                }).to(el, 0.1, {
                    konva: {
                        shadowColor: 'blue',
                        strokeWidth: 5,
                        shadowBlur: 0.2,
                        shadowOffsetX: 0,
                        shadowOffsetY: -4,
                        shadowOpacity: 0.5,
                    },
                    ease: Konva.Easings.Linear,
                }).to(el, 0.1, {
                    konva: {
                        shadowColor: 'red',
                        strokeWidth: 5,
                        shadowBlur: 0.2,
                        shadowOffsetX: 4,
                        shadowOffsetY: 4,
                        shadowOpacity: 0.5,
                    },
                    ease: Konva.Easings.Linear,
                }).to(el, 0.1, {
                    konva: {
                        shadowColor: 'green',
                        strokeWidth: 5,
                        shadowBlur: 0.2,
                        shadowOffsetX: 0,
                        shadowOffsetY: -4,
                        shadowOpacity: 0.5,
                    },
                    ease: Konva.Easings.Linear,
                });
                if (i % 3 === 0) {
                    tl.to(el, 0.1, {
                        konva: {
                            // x: stage.width() / 2 - 10,
                            shadowColor: 'green',
                            strokeWidth: 5,
                            shadowBlur: 0.2,
                            shadowOffsetX: 4,
                            shadowOffsetY: -4,
                            shadowOpacity: 0.5,
                            scaleY: 1.1
                        },
                        ease: Konva.Easings.Linear,
                    }).to(el, 0.1, {
                        konva: {
                            scaleY: 1,
                            // x: stage.width() / 2,
                            shadowColor: 'green',
                            strokeWidth: 5,
                            shadowBlur: 0.2,
                            shadowOffsetX: 0,
                            shadowOffsetY: -4,
                            shadowOpacity: 0.5,
                        },
                        ease: Konva.Easings.Linear,
                    });
                }
            }
            let intervalId = setInterval(loop, 500)
         
            window.lableBakerIntervals.push(intervalId)

            // loop();


        },

        flipinX: (el, duration) => {

            el.opacity(1);
            const tl = new TimelineLite();
            tl.to(el, 0.1, {
                konva: {
                    opacity: 0,
                },
                onComplete: () => {
                    el.setAttr('scaleY', 0);
                },
            }).to(el, 1, {
                konva: {
                    scaleY: 1,
                    opacity: 1,
                },
                ease: Konva.Easings.ElasticEaseOut,
            });
        },

        flipOutX: (el, duration) => {

            el.opacity(1);
            const tl = new TimelineLite();
            tl.to(el, 0.3, {
                konva: {
                    scaleY: 2 * Math.PI * 0.01,
                    opacity: 0.1,
                    rotation: 1

                },
                ease: Konva.Easings.BackEaseIn,
            }).to(el, 0.3, {
                konva: {
                    opacity: 1,
                    scaleY: 1
                }
            });

        },

        zoomOutDown: (el, duration) => {

            const tl = new TimelineLite();

            let initX = el.attrs.x;
            let initY = el.attrs.y;


            tl.to(el, 0.5, {
                konva: {
                    x: stage.width() / 2,
                    y: stage.height() / 2 - 10,
                    scale: 0.5,
                    opacity: 1
                },
                ease: Konva.Easings.BackEaseInOut,
            }).to(el, 0.8, {
                konva: {
                    x: stage.width() / 2,
                    y: (100 * Math.cos((4 * Math.PI) / 1000) + stage.height() / 2 + 50),
                    scale: 0
                },
                ease: Konva.Easings.EaseIn,
            }).to(el, 0.2, {
                konva: {
                    x: initX,
                    y: initY,
                    scale: 1
                },
            })
        },

        pulse: (el, duration) => {
            const tl = new TimelineLite();
            tl.to(el, 0.4, {
                konva: {
                    scale: 1.1
                },
            }).to(el, 0.4, {
                konva: {
                    scale: 1
                },
            });
        },
        jello: (el, duration) => {
            const tl = new TimelineLite();
            tl.to(el, 0.3, {
                konva: {
                    rotation: -5,
                    scaleY: 1.5
                },
            }).to(el, 0.1, {
                konva: {
                    rotation: 4,
                    scaleY: 0.8
                },
            }).to(el, 0.1, {
                konva: {
                    rotation: -3,
                    scaleY: 1
                },
            }).to(el, 0.1, {
                konva: {
                    rotation: 2,
                },
            }).to(el, 0.1, {
                konva: {
                    rotation: -1,
                },
            }).to(el, 0.1, {
                konva: {
                    rotation: 0,
                },
            })
        },

        tada: (el, duration) => {
            const tl = new TimelineLite();
            tl.to(el, 0.2, {
                konva: {
                    rotation: -2,
                    scale: 0.8
                },
            }).to(el, 0.1, {
                konva: {
                    rotation: 2,
                    scale: 1.1
                },
            })
            for (let i = 0; i < 4; i++) {
                tl.to(el, 0.1, {
                    konva: {
                        rotation: -2,
                    },
                }).to(el, 0.1, {
                    konva: {
                        rotation: 2,
                    },
                });
            }
            tl.to(el, 0.1, {
                konva: {
                    rotation: 0,
                    scale: 1,
                },
            });

        },

        spring: (el, duration) => {
            el.opacity(0);
            let txt = el.attrs.text;
            el.setAttr('offsetX', 0);
            el.scaleX(1.2);
            const tl = new TimelineLite();

            tl.to(el, 1, {
                konva: {
                    opacity: 0.7,
                    offsetX: el.width() / 2,
                    scaleX: 1,
                },
                onComplete: () => {
                    el.setAttr('opacity', 1);
                },
            }).to(el, 1, {
                delay: 2,
                konva: {
                    scaleX: 1.2,
                    opacity: 0,
                    offsetX: el.width(),
                }
            }).to(el, 0, {
                delay: 0.5,
                konva: {
                    opacity: 1,
                    offsetX: el.width() / 2,
                    scaleX: 1
                },
            });


        },



    }

    animationType[animationName](el, duration);
}