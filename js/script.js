$(document).ready(function() {
    $('svg.light path').each(function() {
        $(this).attr("filter", "url(#drop-shadow)");
    });
    
    $('select').material_select();
});

$(window).on('load', function() {
    var chq = $('#neon-chq');
    var labs = $('#neon-labs');
    var arrow = $('#neon-arrow');

    delay(function(){turnOn(chq)}, 500)
        .delay(function(){turnOff(chq)}, 40)
        .delay(function(){turnOn(chq)}, 120)
        .delay(function(){turnOff(chq)}, 60)
        .delay(function(){turnOn(chq)}, 100)
        .delay(function(){turnOff(chq)}, 80)
        .delay(function(){turnOn(chq); stayOn(chq)}, 100);
    
    delay(function(){turnOn(labs)}, 900)
        .delay(function(){turnOff(labs)}, 50)
        .delay(function(){turnOn(labs)}, 80)
        .delay(function(){turnOff(labs)}, 70)
        .delay(function(){turnOn(labs)}, 120)
        .delay(function(){turnOff(labs)}, 100)
        .delay(function(){turnOn(labs); stayOn(labs)}, 100);
    
    delay(function(){turnOn(arrow); stayOn(arrow)}, 1000);

});

function turnOn(neon) {
    neon.addClass('on');
}

function stayOn(neon) {
    neon.children('svg').addClass('flicker');
}

function turnOff(neon) {
    neon.removeClass('on');
}

function delay(fn, t) {
    // private instance variables
    var queue = [], self, timer;

    function schedule(fn, t) {
        timer = setTimeout(function() {
            timer = null;
            fn();
            if (queue.length) {
                var item = queue.shift();
                schedule(item.fn, item.t);
            }
        }, t);            
    }
    self = {
        delay: function(fn, t) {
            // if already queuing things or running a timer, 
            //   then just add to the queue
            if (queue.length || timer) {
                queue.push({fn: fn, t: t});
            } else {
                // no queue or timer yet, so schedule the timer
                schedule(fn, t);
            }
            return self;
        },
        cancel: function() {
            clearTimeout(timer);
            queue = [];
        }
    };
    return self.delay(fn, t);
}