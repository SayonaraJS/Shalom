import playButtonImg from '../../images/playButton.svg';
import EntryHelper from '../../services/entryHelper';

class MainController {
  /** @ngInject */
  constructor($log, $timeout, $sce, $location, sayonaraService) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.$sce = $sce;
    this.$location = $location;
    this.sayonaraService = sayonaraService;

    this.playButtonImage = playButtonImg;
    this.entryHelper = EntryHelper;

    this.sayonaraSite = {};

    this.totalCategories = [];
    this.currentCategory = false;
  }

  $onInit() {
    this.sayonaraService.getSite().then(siteJson => {
      // Using timeout to propogate controller changes
      this.$timeout(() => {
        this.sayonaraSite = siteJson;

        // Get our entry categories
        this.sayonaraSite.pages[0].entryTypes[0].entries.forEach(entry => {
          entry.categories.forEach(category => {
            if (!this.totalCategories.includes(category.title)) {
              this.totalCategories.push(category.title);
            }
          });
        });
      }, 0);
    });
  }

  /**
   * Ng-click to navigate to entry
   */
  goToEntry(entry) {
    this.$location.path('/entry/' + entry.title);
  }

  /**
   * Funciton to act as our category filter
   */
  entryCategoryFilter(entry) {
    // Check if we have no current category
    if (!this.currentCategory) {
      return true;
    }
    // Check if we have no categories
    if (!entry ||
      !entry.categories ||
      entry.categories.length <= 0) {
      return false;
    }
    // Look through our entry categories
    let response = false;
    entry.categories.some(category => {
      if (category.title === this.currentCategory) {
        response = true;
        return true;
      }
      return false;
    });
    return response;
  }

  /**
   * function called whenever a category is clicked
   */
  categoryClick(category) {
    // First check if we a rediabling a category
    if (this.currentCategory &&
      this.currentCategory === category) {
      this.currentCategory = false;
      return;
    }

    // If not, Clear all items, timeout,
    // and assign the category
    this.currentCategory = 'TIMEOUTTIMEOUTTIMEOUT';
    this.$timeout(() => {
      this.currentCategory = category;
    }, 50);
  }
}

export const main = {
  template: require('./main.html'),
  controller: MainController
};
