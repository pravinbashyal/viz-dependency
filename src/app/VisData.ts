import { deps } from '../deps'
import {
  hasLegacyStructure,
  reduceToSourceDep,
  moduleDependencyFinder,
  uniqBySource,
} from './helpers'
import { DependencyItem, SourceAndDependsOn } from '../domain/Domain'

const modules = deps.modules.map(reduceToSourceDep)

const legacyModules: Array<DependencyItem> = modules.filter(hasLegacyStructure)

const modulesThatDependOn = moduleDependencyFinder(modules)

const sortByDependencyLength = (dep1, dep2) =>
  dep2.modulesThatDependsOn.length - dep1.modulesThatDependsOn.length

export const sortedSourceAndDependencies: Array<SourceAndDependsOn> = legacyModules
  .map((legacyModule) => ({
    source: legacyModule.source,
    modulesThatDependsOn: modulesThatDependOn(legacyModule),
  }))
  .sort(sortByDependencyLength)

export const allUniqueDependencies = uniqBySource(
  sortedSourceAndDependencies
    .map(({ modulesThatDependsOn }) => modulesThatDependsOn)
    .flat()
)
