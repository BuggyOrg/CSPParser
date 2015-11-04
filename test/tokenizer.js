/* global describe, it */

var expect = require('chai').expect
var tok = require('../lib/tokenizer.js')

describe('CSP parser', function () {
  it('primitive statements', function () {
    var defs = tok('P = Q')
    expect(defs).to.deep.equal([['def', 'P', 'Q']])
    expect(function () { tok('P = e') }).to.throw(Error)
  })
  it('then operator', function () {
    var defs = tok('P = m -> P')
    expect(defs).to.deep.equal([['def', 'P', ['then', 'm', 'P']]])
    expect(function () { tok('P = Q -> P') }).to.throw(Error)
  })
  it('choice operator', function () {
    var defs = tok('P = a -> P | b → Q')
    expect(defs).to.deep.equal([['def', 'P', ['choice', ['then', 'a', 'P'], ['then', 'b', 'Q']]]])
  })
  it('label operator', function () {
    var defs = tok('Q = test:P')
    expect(defs).to.deep.equal([['def', 'Q', ['label', 'test', 'P']]])
    expect(function () { tok('Q = test : P') }).to.throw(Error)
  })
  it('hide operator', function () {
    var defs = tok('Q = P \\ x')
    expect(defs).to.deep.equal([['def', 'Q', ['hide', 'P', 'x']]])
  })
  it('infix operators', function () {
    var defs = tok('P = P << Q')
    expect(defs).to.deep.equal([['def', 'P', ['chain', 'P', 'Q']]])
    expect(function () { tok('P = w << P') }).to.throw(Error)
  })
})
