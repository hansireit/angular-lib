import { ExtractFromArgvOptions } from './extract-from-argv-options';

/**
 * Extracts a given value from a list of arguments from 'process.argv'
 * @param targetKey the variable key where the value should be extracted
 * @param options options to provide a custom argv-list to extract from and other options
 * @returns {string | null} the found value, null if the key was not found
 */
export const extractFromArgv = (targetKey: string, options: ExtractFromArgvOptions = {}): string | null => {
  options.argv = options.argv ?? process.argv ?? [];
  options.valueSeparator = options.valueSeparator ?? '=';

  for (const arg of options.argv) {
    const argvParts = options.valueSeparator ? arg.split(options.valueSeparator) : [arg];
    if (argvParts[0] === targetKey) {
      return argvParts[1] ?? '';
    }
  }

  return null;
};
