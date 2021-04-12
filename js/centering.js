$(function() {
    setPosLearnMore();

    $(window).resize (function() {
        setPosLearnMore();
    });
});

function setPosLearnMore(){
    $('#learn-more-button').position({
        my: "center bottom",
        at: "center bottom-15",
        of: '#home',
        collision: 'none'
    });
}