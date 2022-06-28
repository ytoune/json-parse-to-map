# json parse to map

json parse to return Map instead of Record.

```javascript
import { parse, stringify } from '@ytoune/json-parse-to-map'

const map = new Map([
  ['a', 1],
  ['b', [2]],
  ['c', new Map([])],
])
expect(stringify(map)).toBe('{"a":1,"b":[2],"c":{}}')
expect(parse('{"a":1,"b":[2],"c":{}}')).toEqual(map)
```
