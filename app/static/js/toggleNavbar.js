const toggleNavbar = () => {
    console.log("toggleNavbar.js loaded");
    // toggle the left-side navbar
    $(document).ready(function () {
        $('.sidebar__button--close').on('click', function () {
            $('.sidebar').css('width', '4%');
            $('.sidebar--opened').addClass('hide');
            $('.sidebar--closed').removeClass('hide');
        });

        $('.sidebar__button--open').on('click', function () {
            $('.sidebar').css('width', '22%');
            $('.sidebar--opened').removeClass('hide');
            $('.sidebar--closed').addClass('hide'); 
        });
      
    });

    $(document).ready(function () {
        $('#filterToggle').on('click', function () {
            $('.side-column').addClass('hide')
            $('.nav-link').removeClass('active')
            $('#mapbar').addClass('col-6')
            $('#mapbar').removeClass('col-8')
            $('#selects').toggleClass('hide');
            $('#infographics').toggleClass('hide');
            $('#filterToggle').toggleClass('active');
        });
    });

    $(document).ready(function () {
        $('#howtoToggle').on('click', function () {
            $('.side-column').addClass('hide')
            $('.nav-link').removeClass('active')
            $('#mapbar').addClass('col-8')
            $('#mapbar').removeClass('col-6')
            $('#howto').toggleClass('hide');
            $('#howtoToggle').toggleClass('active');
        });
    });
}
