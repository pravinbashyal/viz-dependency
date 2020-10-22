export type DependencyItem = { source: string; dependencies: Array<any> }

export type SourceAndDependsOn = {
  source: string
  modulesThatDependsOn: Array<any>
}
