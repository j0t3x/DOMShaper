var assert = require('assert');
var ds = require('../bin/domshaper.js');


describe('DOMShaper', function() {
  describe('#shape', function() {
    it('it should have 0 childs at creation', function() {
      var s = new ds.Shape('p');
      assert.equal( s.childs.length, 0);
    });
  });
  describe('#formShape', function() {
    it('should return a FormShape instance at creation', function() {
      var s = new ds.FormShape('/report');
      assert.equal( s instanceof ds.FormShape, true );
    });
  });
});
