var assert = require('assert');
var ds = require('../bin/domshaper.js');


describe('DOMShaper', function() {
  describe('#getArgumentByName', function() {
    it('Shape creation', function() {
      var s = new ds.Shape('p');
      assert.equal( s.childs.length, 0);
    });
  });
});
