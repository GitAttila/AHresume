/*jshint esversion: 6 */
// global jquery import - must be also provided in the webpack config file
import $ from 'jquery';
import './modules/animatecss';
import lightGallery from 'lightgallery/dist/js/lightgallery-all';
import Carousels from './modules/carousels';
import MobileNavigation from './modules/mobilenav';
import './modules/smsetup';
import Projects from './modules/projects';

var carousels = new Carousels();
var mobilenavigation = new MobileNavigation;
var projects = new Projects();
