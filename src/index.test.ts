/* eslint-disable @typescript-eslint/ban-types */

import { inspect } from 'util'

import { parse, stringify } from '.'
import type { ReadonlyJSONValue } from '.'

it('demo', () => {
	const map = new Map<string, ReadonlyJSONValue>([
		['a', 1],
		['b', [2]],
		['c', new Map([])],
	])
	expect(stringify(map)).toBe('{"a":1,"b":[2],"c":{}}')
	expect(parse('{"a":1,"b":[2],"c":{}}')).toEqual(map)
})

const list: [ReadonlyJSONValue, string][] = [
	[null, `null`],
	[false, `false`],
	[true, `true`],
	[1, `1`],
	[0, `0`],
	['a', `"a"`],
	['', `""`],
	[new Map(), `{}`],
	[new Map([['a', 1]]), `{"a":1}`],
	[[1, 2, '3'], `[1,2,"3"]`],
	[
		new Map([
			[
				'b',
				new Map<string, ReadonlyJSONValue>([
					['c', 'd'],
					['d', ['e']],
					['e', false],
				]),
			],
		]),
		`{"b":{"c":"d","d":["e"],"e":false}}`,
	],
]

describe('parse', () => {
	for (const [v, s] of list)
		it(s, () => {
			expect(parse(s)).toEqual(v)
		})
})

describe('stringify', () => {
	for (const [v, s] of list)
		it(inspect(v, false, 15, false).replace(/\s+/gisu, ' ').trim(), () => {
			expect(stringify(v)).toEqual(s)
		})
})

describe('json', () => {
	for (const [v, s] of list) {
		it(inspect(v, false, 15, false).replace(/\s+/gisu, ' ').trim(), () => {
			expect(parse(stringify(v))).toEqual(v)
		})
		it(s, () => {
			expect(stringify(parse(s))).toEqual(s)
		})
	}
})
