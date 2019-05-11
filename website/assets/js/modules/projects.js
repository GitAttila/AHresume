import Isotope from 'isotope-layout';
import 'isotope-layout/js/layout-modes/fit-rows';
import imagesLoaded from 'imagesloaded';

class Projects {

    constructor() {
        this.projectsGridEl = $('#projectsGrid');
        this.projectsGrid;
        this.initProjectsGrid();
        this.updateProjectsGrid = function() {
            this.projectsGrid.layout();
        };
    }

    initProjectsGrid() {
        let self = this;
        var imgLoaded = imagesLoaded('body', { background: true }, function () {
            console.log('images have loaded...');
        });
        imgLoaded.on( 'always', function( instance ) {
            setTimeout(()=>{
                self.projectsGrid = new Isotope( self.projectsGridEl[0], {
                    percentPosition : true,
                    itemSelector: '.grid-layout__item',
                    stagger:50,
                    masonry: {
                        columnWidth: '.grid-layout--sizer',
                        gutterWidth: 20
                    }
                });
                self.events(self.projectsGrid);
                self.initGalleries();
                // $('section.section-loading').fadeOut(1000, function(){

                    // init filtering to show 'about' grid initially
                    // this.navigation.navGrid.arrange({ filter: '[data-menu*="about"]' });
                // });
            },1000);
        });
        imgLoaded.on( 'fail', function( instance ) {
            console.log(
                brokenCount + " of images have broken links. Check your image paths."
            );
        });
        imgLoaded.on( 'progress', function( instance, image ) {
            if (image.isLoaded) {
                // $('#loading-spinner .progress__status').width(instance.progressedCount / instance.images.length * 100 + '%');
            } else {
                brokenCount++;
            }
        });
    }

    events(grid) {
        let lastNavMenuClicked='all';
        self = this;
        grid = grid || self.projectsGrid;
        $("#project-filter [data-filter]").on('click', function(e){
            let isFilterItemDisabled = $(this).hasClass('btn-site--disabled');
            e.preventDefault();
            let filterValue = $(this).data('filter').toLowerCase().trim();
            if ((lastNavMenuClicked === filterValue) || isFilterItemDisabled) {
                return;
            }
            console.log(filterValue, lastNavMenuClicked);
            lastNavMenuClicked = filterValue;

            $("#project-filter .filter__item").removeClass("btn-site--active");
            $(this).addClass("btn-site--active");
            $('#project-filter .filter__item').addClass('btn-site--disabled');

            // collapse the nav menu on mobile after a menu item has been clicked
            if ($("#menuContent").hasClass('show')) {
                $("#menuContent").delay(300).collapse('hide');
            }

            grid.arrange({
                filter: function(item){
                    let found = false;
                    let itemData = $(item).data("category").toLowerCase().trim();
                    let valuesArr = itemData.split(',');
                    for (let i = 0;i<valuesArr.length; i++) {
                        if (valuesArr[i].trim()===filterValue) {
                            found = true;
                        }
                    }
                    return found;
                }
            });

            grid.once( 'arrangeComplete', function( filteredItems ) {
                let delayed = 100;
                grid.layout();
                $(filteredItems).each(function(key,val){
                    $(val.element).stop().animateCss('pulse', key * delayed, ()=>{
                        if (key === (filteredItems.length-1)) {
                            $('#project-filter .filter__item').removeClass('btn-site--disabled');
                            // console.log('animation completed...');
                        }
                    });
                });
            });

        });
    }

    initGalleries() {
        $(document).ready(function() {
            $("#dilli6-gallery").lightGallery(); 
            console.log('gallery dilli6 initialized');
        });
    }
}

export default Projects;