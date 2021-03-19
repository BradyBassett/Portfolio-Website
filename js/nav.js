$(function() {
    function navToggle(){
        var old_pos = $(document).scrollTop();

            $(window).scroll(function(){
                var new_pos = $(document).scrollTop();
                var toggled = false;

                if (new_pos > old_pos && toggled == false) {
                    $('.navbar-toggle').css('transform', 'translateY(-90px)');
                    toggled = true;
                }
                else {
                    $('.navbar-toggle').css('transform', `translateY(0)`);
                    toggled = false;
                }
                old_pos = new_pos;

                if (toggled == false && new_pos != 0){
                    $('.navbar-toggle').css('box-shadow', '2px 0px 15px');
                }
                else if (toggled == false && new_pos == 0){
                    $('.navbar-toggle').css('box-shadow', '');
                }
        });
    }

    // Function Calls
    navToggle();
});
