export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('page', {
      url: '/page/:title',
      component: 'page'
    })
    .state('entry', {
      url: '/entry/:title',
      component: 'entry'
    });
}
