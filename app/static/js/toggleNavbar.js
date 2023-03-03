const toggleNavbar = () => {
    console.log("toggleNavbar.js loaded");
    // toggle the left-side navbar
    $(document).ready(function () {
        $('.sidebar__button--close').on('click', function () {
            $('.sidebar--opened').addClass('hide');
            $('.sidebar--closed').removeClass('hide');
            $('#mapbar').addClass('col-11')
            $('#mapbar').removeClass('col-9')
        });

        $('.sidebar__button--open').on('click', function () {
            $('.sidebar--opened').removeClass('hide');
            $('.sidebar--closed').addClass('hide');
            $('#mapbar').removeClass('col-11')
            $('#mapbar').addClass('col-9')
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
