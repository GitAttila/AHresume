import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import scrollTo from 'gsap/src/uncompressed/plugins/ScrollToPlugin';

// init controller
const controller = new ScrollMagic.Controller();

var siteScene = {};
$('#menuContent a[data-filter]').each(function(){
    let sectionName = $(this).data('filter').trim().toLowerCase();
    let sectionDuration = $('.section-' + sectionName).innerHeight();

    siteScene[sectionName] = new ScrollMagic.Scene({
        triggerElement: ".section-" + sectionName,
        triggerHook: "onCenter",
        duration: sectionDuration
    })
    .setClassToggle("a[data-filter='" + sectionName + "']","primary-nav__link--active")
    .addIndicators({
        name: "section-" + sectionName
    })
    .addTo(controller);

});

controller.scrollTo(function(newpos){
    TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
});

$('#menuContent').on('click','a[data-filter]', function(e) {
    e.preventDefault();
    let secElem = $(this).data('filter').trim().toLowerCase();
    if (secElem !== '') {
        if ($('.section-' + secElem).length>0) {
            // $('#menuContent .primary-nav__link').removeClass('primary-nav__link--active');
            // $(this).addClass('primary-nav__link--active');
            let posElem = $('.section-' + secElem).offset().top;
            controller.scrollTo(posElem);
        }
    }
});

let paralDur = $('.section-hero').innerHeight();
const heroParallax = new ScrollMagic.Scene({
    triggerElement: ".section-profile",
    triggerHook: "0.95",
    duration: paralDur
    })
    .setTween(".section-hero",1 , {y: "25%", ease: Linear.easeNone})
    .addIndicators({
        name: "parallax test"
    })
    .addTo(controller);

const revealNavBar = new ScrollMagic.Scene({
        triggerElement: ".section-profile",
        triggerHook: 0.5, 
        offset: 50
    })
    .setClassToggle("#site-header", "layer__opacity-100")
    .addIndicators({
        name: "reveal NavBar"
    }) 
    .addTo(controller);

const blendInAvatar = new ScrollMagic.Scene({
        triggerElement: ".section-profile",
        triggerHook: 0.5, 
        offset: 50
    })
    .setTween(".section-hero__avatar", 0.5 , {scale: "2",opacity: "0", ease: Linear.easeNone})
    .addIndicators({
        name: "reveal NavBar"
    }) 
    .addTo(controller);