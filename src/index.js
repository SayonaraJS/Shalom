import angular from 'angular';

// Import our modules
import {angularNavbarModule} from './modules/navbar/index';
import 'angular-ui-router';

// Import our configs
import routesConfig from './routes';

// Import our services
import Sayonara from './app/services/sayonara';

// Import our components
import {main} from './app/components/main/main';
import {entry} from './app/components/entry/entry';
import {page} from './app/components/page/page';

import './index.scss';

angular
  .module('app', [angularNavbarModule, 'ui.router'])
  .config(routesConfig)
  .service('sayonaraService', Sayonara)
  .run(($log, $timeout, sayonaraService, navbarRouteService) => {
    /** @ngInject */

    // Start polling for the site
    sayonaraService.getSite().then(response => {
      $timeout(() => {
        navbarRouteService.setTitle(response.siteName, {
          title: 'Home',
          state: 'app',
          url: '/'
        });

        // Create our routes from our pages
        const navbarRoutes = [];
        response.pages.forEach((page, index) => {
          if (index === 0) {
            navbarRoutes.push({
              title: page.title,
              state: 'app',
              url: '/'
            });
          } else {
            navbarRoutes.push({
              title: page.title,
              state: 'page',
              stateParams: {
                title: page.title
              },
              url: '/page/' + page.title
            });
          }
        });

        // Set the routes
        navbarRouteService.setRoutes(navbarRoutes);
      }, 0);
    });

    // Set up our nav
    // navbarRouteService.enableAlwaysDesktop();
  })
  .component('app', main)
  .component('entry', entry)
  .component('page', page);
