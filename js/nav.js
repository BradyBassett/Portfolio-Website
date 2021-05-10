$(function() {
    // Burger Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const resumeButton = document.querySelector('.resume-button');
    var hidden = false;

    burger.addEventListener('click', function() {
        hidden = burgerToggle(burger, nav, navLinks, resumeButton, hidden);
    });

    nav.addEventListener('click', function() {
        hidden = burgerToggle(burger, nav, navLinks, resumeButton, hidden);
    });

    // Nav Toggle
    var old_pos = $(document).scrollTop();

    $(window).scroll(function(){
        var new_pos = $(document).scrollTop();
        var toggled = false;

        if (new_pos > old_pos && toggled == false && hidden == false) {
            $('.navbar-toggle').css('transform', 'translateY(-90px)');
            toggled = true;
        }
        else {
            $('.navbar-toggle').css('transform', `translateY(0)`);
            $('nav').css('background-color', 'rgba(40, 40, 40, 0)')
            toggled = false;
        }
        old_pos = new_pos;

        if (toggled == false && new_pos != 0){
            $('.navbar-toggle').css('box-shadow', '2px 0px 15px');
            $('nav').css('background-color', 'rgba(40, 40, 40, 1)')
        }
        else if (toggled == false && new_pos == 0){
            $('.navbar-toggle').css('box-shadow', '');
        }
    });
});

function burgerToggle(burger, nav, navLinks, resumeButton, hidden) {
    nav.classList.toggle('nav-active');
        $('.nav-links').css('transition', 'transform 0.5s ease-in')

        if (hidden == false) {
            $('nav').css('background-color', 'rgba(40, 40, 40, 1)')
            $('.navbar-toggle').css('transform', `translateY(0)`);
            $('body').css('overflow-y', "hidden")
            hidden = true;
        }
        else if (hidden == true && $(document).scrollTop() == 0){
            $('body').css('overflow-y', "visible")
            $('nav').css('background-color', 'rgba(40, 40, 40, 0)')
            hidden = false;
        }
        else {
            $('body').css('overflow-y', "visible")
            $('nav').css('background-color', 'rgba(40, 40, 40, 1)')
            hidden = false;
        }

        navLinks.forEach(function(link, index) {
            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
            }
        });

        if (resumeButton.style.animation) {
            resumeButton.style.animation = '';
        }
        else {
            resumeButton.style.animation = 'navLinkFade 0.5s ease forwards 1s';
        }

        burger.classList.toggle('toggle')

    return hidden;
}
