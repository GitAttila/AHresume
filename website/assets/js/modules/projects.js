import Isotope from "isotope-layout";
import "isotope-layout/js/layout-modes/fit-rows";

class Projects {

    constructor() {
        this.projectsGrid = $('#projectsGrid');
        this.projectsGrid = new Isotope( this.projectsGrid[0], {
            percentPosition : true,
            itemSelector: '.grid-layout__item',
            stagger:50,
            masonry: {
                columnWidth: '.grid-layout--sizer',
                gutterWidth: 20
            }
        });
        this.updateProjectsGrid = function() {
            this.projectsGrid.layout();
        };
    }

    initProjectsGrid() {

    }

}

export default Projects;