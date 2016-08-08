'use strict';

describe('Descriptions E2E Tests:', function () {
  describe('Test Descriptions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/descriptions');
      expect(element.all(by.repeater('description in descriptions')).count()).toEqual(0);
    });
  });
});
