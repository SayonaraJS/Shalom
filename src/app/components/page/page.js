class PageController {
  constructor($log, $timeout, $sce, $stateParams, sayonaraService) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.$sce = $sce;
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
    if (this.$stateParams.title === this.currentPage.title) {
      return this.currentPage;
    }

    // Find the page by its title
    let foundPage = false;
    this.sayonaraSite.pages.some(page => {
      if (page.title === this.$stateParams.title) {
        foundPage = page;
        return true;
      }
      return false;
    });
    // cache the result
    this.currentPage = foundPage;
    return foundPage;
  }
}

export const page = {
  template: require('./page.html'),
  controller: PageController
};
