$(function() {
    setPos();

    $(window).resize (function() {
        setPos();
    });
});

function setPos(){
    // FIXME make element stick to home section
    $('#learn-more-button').position({
        my: "center",
        at: "center bottom-8%",
        of: $(window)
    });
}