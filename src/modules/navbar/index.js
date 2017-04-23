import angular from 'angular';

import NavbarRouteService from './navbarRoute';
import {Navbar} from './navbar';

export const angularNavbarModule = 'angularNav';

angular
  .module(angularNavbarModule, [])
  .service('navbarRouteService', NavbarRouteService)
  .component('angularNav', Navbar);
