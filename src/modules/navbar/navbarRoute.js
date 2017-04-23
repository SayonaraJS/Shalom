class NavbarRouteService {
  constructor() {
    this.title = '';
    this.titleRoute = {};
    this.routes = {};
    this.activeRoute = '';

    // Always show
    this.alwaysDesktop = false;
    this.alwaysMobile = false;
  }

  /**
  * Json should follow the following format
    [{
      title: "Home",
      state: "home",
      url: "/home"
    },
    {
      title: "About",
      state: "about"
      url: "/about"
    }]
  */
  setRoutes(routes) {
    this.routes = routes;
  }

  setTitle(title, route) {
    this.title = title;

    if (route) {
      this.titleRoute = route;
    }
  }

  getRoutes() {
    return this.routes;
  }

  enableAlwaysDesktop() {
    this.alwaysDesktop = true;
    this.alwaysMobile = false;
  }

  enableAlwaysMobile() {
    this.alwaysDesktop = false;
    this.alwaysMobile = true;
  }
}

export default NavbarRouteService;
