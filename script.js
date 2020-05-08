$(function () {
    const ww = $(window).width();
    const wh = $(window).height();
    const m = 4;
    const n = 4;
    let correctCards = 0;

    $("body").prepend('<section id="game"></section>');
    $("#game").css({
        width: m * 100,
        height: n * 100
    });
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            makeDiv(i, j);

        }
    }
    $("#start").click(() => {
        $("#start").hide();
        $("body").append('<button id="restart">Попробуй еще раз!</button>');
        $('#restart').click(() => {
            location.reload();
        });
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                dropIt(i, j);
            }
        }
        $(destroy);
        $(init);
    });

    function init() {
        $(".picDiv").draggable({
            cursor: 'move',
            snap: '.dropDiv',
            stack: ".dropDiv",
            stack: ".picDiv"
        });
        $(".dropDiv").droppable({
            drop: handleDropEvent
        });

        function handleDropEvent(event, ui) {
            if ((ui.draggable.index() + (n * m)) == $(this).index()) {
                ui.draggable.draggable('disable');
                $(this).droppable('disable');
                ui.draggable.position({
                    of: $(this),
                    my: 'left top',
                    at: 'left top'
                });
                ui.draggable.draggable('option', 'revert', false);
                correctCards++;
            }
            if (correctCards == (n * m)) {
                $('body').append('<div class = "slide-fwd-center"></div>');
                $('.slide-fwd-center').append('<iframe src="https://gifer.com/embed/7E2b" width=800 height=600 frameBorder="0" allowFullScreen></iframe>');
            }
        }
    }

    function destroy() {
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {

                if (j % 2 != 0) x = -1 * rand(0, (ww - 100 * m) / 2) - 100;
                else x = 100 * m + rand(0, (ww - 100 * m) / 2 - 100);

                if (i % 2 == 0) y = -1 * rand(0, (ww - 100 * n) / 2) - 100;
                else y = 100 * n + rand(0, (ww - 100 * n) / 2 - 100);

                $('#' + '_' + i + '_' + j).css({
                    left: x,
                    right: y
                });
            }
        }
    }

    function rand(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeDiv(i, j) {
        $("#game").append('<div id="_' + i + '_' + j + '" class="picDiv"></div>');
        $('#' + '_' + i + '_' + j).css({
            "background-image": "url('img/5.png')",
            "background-position": (-100 * i) + "px " + (-100 * j) + "px",
            left: 100 * i,
            top: 100 * j
        });
    }

    function dropIt(s, d) {
        $("#game").append('<article id="' + s + '_' + d + '" class="dropDiv"></article>');
        $('#' + s + '_' + d).css({
            "background-image": "url('img/5.png')",
            "background-position": (-100 * s) + "px " + (-100 * d) + "px",
            left: 100 * s,
            top: 100 * d
        });
    }
});