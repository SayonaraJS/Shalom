import EntryHelper from '../../services/entryHelper';

class EntryController {
  /** @ngInject */
  constructor($log, $timeout, $state, $stateParams, $sce, sayonaraService) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$sce = $sce;
    this.sayonaraService = sayonaraService;

    this.entryHelper = EntryHelper;

    // Initialize our entry
    this.sayonaraSite = {};
    this.entry = {};
  }

  $onInit() {
    // Get the entry
    this.sayonaraService.getSite().then(siteJson => {
      // Go to our entry array
      this.sayonaraSite = siteJson;
      const entries = siteJson.pages[0].entryTypes[0].entries;

      // Find the entry we are looking for
      const foundEntry = entries.some(entry => {
        if (entry.title === this.$stateParams.title) {
          this.entry = entry;
          return true;
        }
        return false;
      });

      if (!foundEntry) {
        this.entry = {
          title: 'Entry not found..'
        };
      }
    });
  }

  goBackHome() {
    this.$state.go('app');
  }

  /**
   * Funciton to get the emebed source,
   * trust with $sce, and return
   */
  getTrustedEmbed() {
    const embedUrl = this.entryHelper.getEmbed(this.entry);
    return this.$sce.trustAsResourceUrl(embedUrl);
  }
}

export const entry = {
  template: require('./entry.html'),
  controller: EntryController
};
