class Sayonara {

  /** @ngInject */
  constructor($log, $location, $http) {
    this.$log = $log;
    this.$location = $location;
    this.$http = $http;

    // Promise of getting blog json
    this.sayonaraPromise = {};
    this.sayonaraSite = {};

    // Make a request to get the site
    const sayonaraUrlPath = '/api/public';
    let sayonaraUrlHost = '';
    // Production and API URL from webpack config
    if (PRODUCTION) {
      // Point to prod sayonara
      sayonaraUrlHost = '//' + this.$location.host();
    } else {
      // Point to Dev sayonara
      sayonaraUrlHost = API_URL;
    }

    this.sayonaraPromise = this.$http({
      method: 'GET',
      url: sayonaraUrlHost + sayonaraUrlPath
    }).then(response => {
      // this callback will be called asynchronously
      // when the response is available
      // this.$log.debug('Sayonara Response: ', response.data);
      this.sayonaraSite = response.data;
    }, response => {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      this.$log.error('Sayonara Error: ', response);
    });
  }

  getSite() {
    return new Promise(resolve => {
      if (Object.keys(this.sayonaraSite) > 0) {
        resolve(this.sayonaraSite);
      }

      // Promise still grabbing
      this.sayonaraPromise.then(() => {
        resolve(this.sayonaraSite);
      });
    });
  }
}

export default Sayonara;
