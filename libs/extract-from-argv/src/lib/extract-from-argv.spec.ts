import { extractFromArgv } from './extract-from-argv';
import { ExtractFromArgvOptions } from './extract-from-argv-options';

describe('extractFromArgv', () => {
  it('should return null if the target argument was not found', () => {
    process.argv = [];
    expect(extractFromArgv('--port')).toEqual(null);
  });

  it('should return an empty string if the target argument was found and has no value', () => {
    process.argv = ['/usr/node', '--port'];
    expect(extractFromArgv('--port')).toEqual('');
  });

  it('should return the value if the target argument was found and contains a value', () => {
    process.argv = ['/usr/node', '--port=4200'];
    expect(extractFromArgv('--port')).toEqual('4200');
  });

  it('should use the passed argv list passed by the options', () => {
    process.argv = ['/usr/node', '--port2=4000'];
    const options: ExtractFromArgvOptions = { argv: ['/usr/node', '--port=4201'] };
    expect(extractFromArgv('--port2', options)).toEqual(null);
    expect(extractFromArgv('--port', options)).toEqual('4201');
  });

  it('should use a different value separator passed by the options', () => {
    process.argv = ['/usr/node', '--port:4000'];
    const options: ExtractFromArgvOptions = { valueSeparator: ':' };
    expect(extractFromArgv('--port', options)).toEqual('4000');
  });
});
