$(function() {
    setPos();

    $(window).resize (function() {
        setPos();
    });
});

function setPos(){
    $('#learn-more-button').position({
        my: "center",
        at: "center bottom-8%",
        of: $(window)
    });
}