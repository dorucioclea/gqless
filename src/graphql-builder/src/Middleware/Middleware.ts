import { DocumentNode } from 'graphql'
import { QueryResponse } from '../GraphQL'
import { Selection } from '../Selection'
import { Accessor } from '../Accessor'

export type ScalarProxyHandler = (prop: string | symbol) => any
export interface Middleware {
  // Called each time a new selection is created
  onSelect?(selection: Selection<any>): void

  // Called each time a selection is destroyed
  onUnselect?(selection: Selection<any>): void

  // // Called each time a new selection is created
  // onDataAccessed?(selection: Selection<any>): void

  // // Called each time a selection has changed
  // onSelectUpdate?(selection: Selection<any>): void

  onFetch?(
    query: DocumentNode,
    response: Promise<QueryResponse>,
    selections: Selection<any>[]
  ): void

  // getScalarData?(
  //   selection: Selection<UScalarNode>,
  //   value: string | number | boolean | object
  // ): any

  dispose?(): void
}

export type MiddlewareMethod<K extends keyof Middleware> = Exclude<
  Middleware[K],
  undefined
>