/*jshint esversion: 6 */
import 'bootstrap/js/dist/collapse';
class MobileMenu {
    
    constructor() {
        this.menuIcon = $(".hamburger__menu-icon");
        this.menuContent = $("#menuContent");
        this.events();
    }

    events() {
        var self = this;
        $(this.menuContent).on("show.bs.collapse", function(){
            self.toggleTheIcon();
        });
        $(this.menuContent).on("shown.bs.collapse", function(){
            $(self.menuContent).children('.primary-nav__items-wrapper').animateCss('pulse');
        });
        $(this.menuContent).on("hide.bs.collapse", function(){
            self.toggleTheIcon();
        });
    }
    
    toggleTheIcon() {
        this.menuIcon.toggleClass("hamburger__menu-icon--close-x");
    } 

}

export default MobileMenu;