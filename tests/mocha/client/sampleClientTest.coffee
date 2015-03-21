if !(typeof MochaWeb is 'undefined')
  MochaWeb.testOnly ->
    describe "a group of tests", ->
      it "should respect equality", ->
        chai.assert.equal(5,5)