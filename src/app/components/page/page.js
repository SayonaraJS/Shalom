class PageController {
  constructor($log, $timeout, $sce, $stateParams, $location, sayonaraService) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.$sce = $sce;
    this.$location = $location;
    this.$stateParams = $stateParams;
    this.sayonaraService = sayonaraService;

    this.sayonaraSite = {};
    this.currentPage = {};
  }

  $onInit() {
    this.sayonaraService.getSite().then(siteJson => {
      // Using timeout to propogate controller changes
      this.$timeout(() => {
        this.sayonaraSite = siteJson;
      }, 0);
    });
  }

  // Get page by it's title
  getPage() {
    if (!this.sayonaraSite || Object.keys(this.sayonaraSite).length < 1) {
      return false;
    }

    // Check the cache before iterating
    if (this.$stateParams.title &&
      this.$stateParams.title === this.currentPage.title) {
      return this.currentPage;
    }

    // Find the page by its title
    // Default page is Home
    let foundPage = false;
    this.sayonaraSite.pages.some(page => {
      if (this.$stateParams.title &&
        page.title === this.$stateParams.title) {
        foundPage = page;
        return true;
      }
      return false;
    });

    // If we did not find a result
    if (foundPage) {
      // cache the result
      this.currentPage = foundPage;
    } else {
      // Simply return the First (Default) page
      this.currentPage = this.sayonaraSite.pages[0];
    }
    return this.currentPage;
  }

  /**
   * Ng-click to navigate to entry
   */
  goToEntry(entry) {
    this.$location.path('/entry/' + entry.title);
  }
}

export const page = {
  template: require('./page.html'),
  controller: PageController
};
