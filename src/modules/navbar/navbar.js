class NavbarController {
  /** @ngInject */
  constructor($log, $state, $stateParams, $location, navbarRouteService) {
    this.$log = $log;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.navbarRouteService = navbarRouteService;
    this.showNav = false;
  }

  // Check if a route is active
  isActive(route) {
    if (route.state) {
      if (route.stateParams) {
        // Check and make sure all params are the same
        let paramsValid = true;
        Object.keys(route.stateParams).some(param => {
          if (this.$stateParams[param] !== route.stateParams[param]) {
            paramsValid = false;
            return true;
          }
          return false;
        });
        return paramsValid && this.$state.includes(route.state);
      }
      return this.$state.includes(route.state);
    } else if (route.url) {
      return this.$location.path().includes(route.url);
    }
    this.$log.err('Angular Navbar: Route object must contain a \'state\' or \'url\' key');
    return false;
  }

  // Go to a State
  goToState(route) {
    if (route.state) {
      // Pass params if we have them
      if (route.stateParams) {
        this.$state.go(route.state, route.stateParams);
      } else {
        this.$state.go(route.state);
      }
    } else if (route.url) {
      this.$location.path(route.url);
    }
    this.showNav = false;
  }
}

// Return the component
export const Navbar = {
  template: require('./navbar.html'),
  controller: NavbarController
};
