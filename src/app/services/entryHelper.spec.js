import angular from 'angular';
import 'angular-mocks';
import EntryHelper from './entryHelper';

describe('EntryHelper service', () => {
  beforeEach(() => {
    angular
      .module('EntryHelper', [])
      .service('EntryHelper', EntryHelper);
    angular.mock.module('EntryHelper');
  });

  it('should', angular.mock.inject(EntryHelper => {
    expect(EntryHelper.getData()).toEqual(3);
  }));
});
