$(function() {
    setPos();

    $(window).resize (function() {
        setPos();
    });
});

function setPos(){
    $('#learn-more-button').position({
        my: "center bottom",
        at: "center bottom-15",
        of: '#home',
        collision: 'none'
    });
}