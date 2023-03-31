const toggleNavbar = () => {
    console.log("toggleNavbar.js loaded");
    // toggle the left-side navbar
    $(document).ready(function () {
        const districts = JSON.parse($('#districtMapsLinks').text());
        const regions = districts.map(d => d.Region);
        const uniqueRegions = [...new Set(regions)];
        const regionOptions = uniqueRegions.map(r => `<option value="${r}">${r}</option>`);
        $('#map_region').append(regionOptions);
        
        // listen for changes in the region select
        $('#map_region').on('change', function () {
            const selectedRegion = $(this).val();
            const selectedDistricts = districts.filter(d => d.Region === selectedRegion);
            const districtOptions = selectedDistricts.map(d => `<option value="${d.Map_link}">${d.District}</option>`);
            $('#map_district').empty();
            $('#map_district').append(['<option value="">SELECT DISTRICT</option>', ...districtOptions]);
        });

        // listen for changes in the district select
        $('#map_district').on('change', function () {
            const link = $(this).val();
            console.log('looking at link', link);
            // update the download link
            $('#map_download_link').attr('href', link);
           
        });

        console.log('looking at unique regions', uniqueRegions);
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
