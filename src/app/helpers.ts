import { uniqBy } from 'lodash'
import { DependencyItem } from '../domain/Domain'

export const hasLegacyStructure = (module: DependencyItem) => {
  return /LegacyStructure/.test(module.source)
}

export const hasThisAsDependency = (source) => ({ dependencies }) =>
  dependencies.find(
    ({ resolved }) => source.includes(resolved) || resolved.includes(source)
  )

export const reduceToSourceDep = ({
  source,
  dependencies,
}): DependencyItem => ({
  source: stripSrc(source),
  dependencies: dependencies.map(({ resolved, module }) => ({
    resolved: stripSrc(resolved),
    module: stripSrc(module),
  })),
})

export const resolveDepPathFromDep = ({ resolved }) => resolved

export const dependencyFromDependencyName = (
  modules: Array<DependencyItem>
) => (dependencyName: string) =>
  modules.find(({ source }) => {
    return source.includes(dependencyName) || dependencyName.includes(source)
  })

export const moduleDependencyFinder = (modules: Array<DependencyItem>) => ({
  source,
}) => modules.filter(hasThisAsDependency(source))

export const log = (message: string) => <T>(item: T): T => {
  console.log(message, item)
  return item
}

export const uniqBySource = (modules: DependencyItem[]) =>
  uniqBy(modules, 'source')

export const stripSrc = (source) => {
  if (source.includes('src/', 0)) {
    return source.substr(4)
  }
  return source
}
