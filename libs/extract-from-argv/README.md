# extract-from-argv

Extracts arguments that were passed when the Node.js process was launched.

## Usage

**Pass arguments to the node process and read it**

```node my-script.js --port=4200```
```ts
const port = extractFromArgv('--port'); // Returns '4200'
```

**Custom separator**

```node my-script.js --port:4200```
```ts
const port = extractFromArgv('--port', { valueSeparator: ':' }); // Returns '4200'
```
**Custom argv object**
```ts
const port = extractFromArgv('--port', { argv: ['/usr/node', '--port=5000'] }); // Returns '5000'
```

**Arguments without values**

```node my-script.js --fun-mode```
```ts
// If an argument without an value is found it returns an empty string
extractFromArgv('--fun-mode'); // Returns ''

// If a argument was not found the function returns null
extractFromArgv('--angry-mode'); // Returns null'
```
