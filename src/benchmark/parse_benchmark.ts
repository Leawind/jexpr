import Benchmark, {Event} from 'benchmark';
import {parse} from '../lib/parser.js';
import {DefaultAstFactory as AstFactory} from '../lib/ast_factory.js';

const suite = new Benchmark.Suite();
const astFactory = new AstFactory();

suite
  .add('parse identifier', function () {
    return parse('foo', astFactory);
  })
  .add('parse ascii identifier', function () {
    return parse('hello + world + id + index + identifier', astFactory);
  })
  .add('parse unicode identifier', function () {
    return parse('你好 + Привет + こんにちは + 안녕하세요 + Γειά', astFactory);
  })
  .add('parse complex', function () {
    return parse('(a + b([1, 2, 3]) * c)', astFactory);
  })
  .on('cycle', function (event: Event) {
    console.log(String(event.target));
  })
  .run({async: true});
