/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export type JSONPrimitiveValue = null | boolean | string | number
export type JSONValue =
	| JSONPrimitiveValue
	| JSONValue[]
	| Map<string | number, JSONValue>
export type ReadonlyJSONValue =
	| JSONPrimitiveValue
	| readonly ReadonlyJSONValue[]
	| ReadonlyMap<string | number, ReadonlyJSONValue>

export const stringify = (value: ReadonlyJSONValue): string =>
	JSON.stringify(value, (_, v: unknown) =>
		v instanceof Map ? Object.fromEntries([...v]) : v,
	)

export const parse = (text: string): JSONValue =>
	JSON.parse(text, (_, v: unknown) =>
		'object' === typeof v && !!v && !Array.isArray(v)
			? new Map(Object.entries(v))
			: v,
	)
