import angular from 'angular';
import 'angular-mocks';
import NavbarRoute from './navbarRoute';

describe('NavbarRoute service', () => {
  beforeEach(() => {
    angular
      .module('NavbarRoute', [])
      .service('NavbarRoute', NavbarRoute);
    angular.mock.module('NavbarRoute');
  });

  it('should', angular.mock.inject(NavbarRoute => {
    expect(NavbarRoute.getData()).toEqual(3);
  }));
});
