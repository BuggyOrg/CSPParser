
var grammar = require('../lib/grammar.js')

export default function (termString) {
  return grammar.parse(termString)
}
