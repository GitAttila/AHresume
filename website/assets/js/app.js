/*jshint esversion: 6 */
// global jquery import - must be also provided in the webpack config file
import $ from 'jquery';
import './modules/animatecss';
import Carousels from './modules/carousels';
import MobileNavigation from './modules/mobilenav';


$('.section-hero__avatar').animateCss('pulse');

var carousels = new Carousels();
var mobilenavigation = new MobileNavigation;

