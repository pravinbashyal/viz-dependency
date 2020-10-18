import { DependencyItem } from './Domain'
import { uniqBy } from 'lodash'

export const hasLegacyStructure = (module: DependencyItem) => {
  return /LegacyStructure/.test(module.source)
}

export const hasThisAsDependency = (source) => ({ dependencies }) =>
  dependencies.find(({ module }) => module === source)

export const reduceToSourceDep = ({
  source,
  dependencies,
}): DependencyItem => ({
  source,
  dependencies,
})

export const resolveDepPathFromDep = ({ resolved }) => resolved

export const dependencyFromDependencyName = (
  modules: Array<DependencyItem>
) => (dependencyName: string) =>
  modules.find(({ source }) => {
    return source.includes(dependencyName)
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
