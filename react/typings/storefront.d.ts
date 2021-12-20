import { FunctionComponent } from 'react'

declare global {
  type Obj = Record<string, string | never>
  interface StorefrontFunctionComponent<P = Obj> extends FunctionComponent<P> {
    getSchema?(props: P): Obj
    schema?: Obj
  }

  interface StorefrontComponent<P = Obj, S = Obj> extends Component<P, S> {
    getSchema?(props: P): Obj
    schema: Obj
  }
}
