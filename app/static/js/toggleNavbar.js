const toggleNavbar = () => {
    // toggle the left-side navbar
    $(document).ready(function () {
        $('#sidebarToggle').on('click', function () {
            $('.side-column').addClass('hide')
            $('.nav-link').removeClass('active')
            $('#mapbar').addClass('col-8')
            $('#mapbar').removeClass('col-6')
            $('#sidebar').toggleClass('hide');
            $('#sidebarToggle').toggleClass('active');
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
