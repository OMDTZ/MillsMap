const toggleNavbar = () => {
    console.log("toggleNavbar.js loaded");
    // toggle the left-side navbar
    $(document).ready(function () {

        // toggle the left-side navbar
        $('.sidebar__button--close').on('click', function () {
            $('.sidebar').addClass('sidebar_width--closed');
            $('.sidebar').removeClass('sidebar_width--opened');
            $('.sidebar--opened').addClass('hide');
            $('.sidebar--closed').removeClass('hide');
        });
        $('.sidebar__button--open').on('click', function () {
            $('.sidebar').addClass('sidebar_width--opened');
            $('.sidebar').removeClass('sidebar_width--closed');
            $('.sidebar--opened').removeClass('hide');
            $('.sidebar--closed').addClass('hide'); 
        });

        // Navitem active state
        $('.top_navbar__button').on('click', function () {
            console.log(" nav clicked");
            $('.top_navbar__button').removeClass('top_navbar__button--active');
            $('.page').addClass('hide');
            $(this).addClass('top_navbar__button--active');
            let page = $(this).attr('data-page');
            $(`#${page}`).removeClass('hide');
            if(page === 'home') {
                $('#infographics').removeClass('hide');
            }
            else {
                $('#infographics').addClass('hide');
            }
        });

        // handle dowloading maps
        $('#maps form').on('submit', function (e) {
            e.preventDefault();
            let link = $('#maps form select').val();
            console.log(link);
        });
      
    });
}
