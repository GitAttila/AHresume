import Isotope from 'isotope-layout';
import 'isotope-layout/js/layout-modes/fit-rows';
import imagesLoaded from 'imagesloaded';
import Animations from './smsetup';
import lightGallery from 'lightgallery/dist/js/lightgallery-all';
class Projects {

    constructor() {
        this.projectsGridEl = $('#projectsGrid');
        this.certsGridEl = $('#certsGrid');
        this.galleriesKeys = [
            'dilli6', 'dilli6-web', 'RA-calendar', 'spars', 
            'RA-loginpage', 'RA-merchendise', 'kamenictvi', 
            'RA-dm', 'KE', 'PF', 'bwmagazine', 
            'photoshoots', 'ra-manage', 'ftc', 
            'certs-AdobeDim', 'certs-webpack', 'certs-sketch',
            'certs-asyncjs', 'certs-npm', 'certs-adobexd',
            'certs-cssgrid', 'certs-nodejs', 'certs-git',
            'certs-typescript', 'certs-gulp' ];
        this.projectsGrid;
        this.certsGrid;
        this.initProjectsGrid();
        this.updateProjectsGrid = function() {
            this.projectsGrid.layout();
        };
        this.anims = new Animations();
    }

    initProjectsGrid() {
        let brokenCount = 0;
        let self = this;
        var imgLoaded = imagesLoaded('body', { background: true }, function () {
            console.log('all images have loaded...');
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
                self.certsGrid = new Isotope( self.certsGridEl[0], {
                    percentPosition : true,
                    itemSelector: '.grid-layout__item',
                    stagger:100,
                    masonry: {
                        columnWidth: '.grid-layout--sizer',
                        gutterWidth: 20
                    }
                });
                self.events(self.projectsGrid, '#project-filter');
                self.events(self.certsGrid, '#certs-filter');
                self.initGalleries();
                // initialize animations here
                self.anims.events();

                $('section.section-loading').fadeOut(1000, function(){});

            },1000);
        });
        imgLoaded.on( 'fail', function( instance ) {
            console.log(
                brokenCount + " of images have broken links. Check your image paths."
            );
        });
        imgLoaded.on( 'progress', function( instance, image ) {
            if (image.isLoaded) {
                $('#loading-spinner .progress__status').width(instance.progressedCount / instance.images.length * 100 + '%');
            } else {
                brokenCount++;
            }
        });
    }

    events(grid, filterID) {
        let lastNavMenuClicked='all';
        let self = this;
        $(filterID + " [data-filter]").on('click', function(e){
            let isFilterItemDisabled = $(this).hasClass('btn-site--disabled');
            e.preventDefault();
            let filterValue = $(this).data('filter').toLowerCase().trim();
            if ((lastNavMenuClicked === filterValue) || isFilterItemDisabled) {
                return;
            }
            // console.log(filterValue, lastNavMenuClicked);
            lastNavMenuClicked = filterValue;

            $(filterID + ' .filter__item').removeClass("btn-site--active");
            $(this).addClass("btn-site--active");
            $(filterID + ' .filter__item').addClass('btn-site--disabled');

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
                            $(filterID + ' .filter__item').removeClass('btn-site--disabled');
                            // console.log('animation completed...');
                        }
                    });
                });
            });

        });

        $(self.projectsGrid).find('.project-card').on('click', function(){
            $(this).children().children('.project-card__gallery').animateCss('bounceIn');
        });
        $(self.certsGrid).find('.project-card').on('click', function(){
            $(this).children().children('.project-card__gallery').animateCss('bounceIn');
        });

    }

    initGalleries() {
        let _self = this;
        $(document).ready(function() {
            $.each(_self.galleriesKeys, function(key, val) {
                let galKey = val.trim().toLowerCase();
                let idSelector = "#" + galKey + "-gallery";
                $(idSelector).lightGallery(
                    {
                        closable: true
                    }
                );
            });
            console.log('galleries initialized');
        });
    }
}

export default Projects;