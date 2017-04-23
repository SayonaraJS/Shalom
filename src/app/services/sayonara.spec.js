import angular from 'angular';
import 'angular-mocks';
import Sayonara from './sayonara';

describe('Sayonara service', () => {
  beforeEach(() => {
    angular
      .module('Sayonara', [])
      .service('Sayonara', Sayonara);
    angular.mock.module('Sayonara');
  });

  it('should', angular.mock.inject(Sayonara => {
    expect(Sayonara.getData()).toEqual(3);
  }));
});
