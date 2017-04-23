import angular from 'angular';
import 'angular-mocks';
import {page} from './page';

describe('page component', () => {
  beforeEach(() => {
    angular
      .module('page', ['app/components/page/page.html'])
      .component('page', page);
    angular.mock.module('page');
  });

  it('should...', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<page></page>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
