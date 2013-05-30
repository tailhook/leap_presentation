var last_swipe = 0;
var last_circle = 0;
var circle_gesture = 0;
var circle_progress = 0;
Leap.loop({enableGestures: true}, function(frame) {
    for(var i = 0; i < frame.gestures.length; ++i) {
        var gest = frame.gestures[i];
        if(gest.type == 'swipe') {
            if(last_swipe + 500 > +new Date())
                continue;
            if(gest.distance < 50)
                continue;
            if(Math.abs(gest.direction.y) > 0.3)
                continue;
            if(gest.direction.x > 0) {
                stack.scroll_on_delta(-1);
            } else {
                stack.scroll_on_delta(1);
            }
            last_swipe = +new Date();
        }
        if(gest.type == 'circle') {
            if(Math.abs(gest.normal.z) < 0.7)
                continue;
            if(gest.id != circle_gesture) {
                if(last_circle + 500 > +new Date())
                    continue;
                circle_gesture = 0;
            }
            if(circle_gesture == 0) {
                circle_gesture = gest.id;
                circle_progress = (gest.progress - 1)*2;
                if(gest.normal.z > 0) {
                    stack.smooth_scroll(circle_progress);
                } else {
                    stack.smooth_scroll(-circle_progress);
                }
            } else {
                var nprog = (gest.progress - 1)*2;
                if(nprog != circle_progress) {
                    if(gest.normal.z > 0) {
                        stack.smooth_scroll(circle_progress - nprog);
                    } else {
                        stack.smooth_scroll(nprog - circle_progress);
                    }
                    circle_progress = nprog;
                }
            }
            last_circle = +new Date();
        }
    }
})
