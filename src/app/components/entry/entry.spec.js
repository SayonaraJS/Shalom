import angular from 'angular';
import 'angular-mocks';
import {entry} from './entry';

describe('entry component', () => {
  beforeEach(() => {
    angular
      .module('entry', ['app/components/entry/entry.html'])
      .component('entry', entry);
    angular.mock.module('entry');
  });

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<entry></entry>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
