import React from 'react'
import './App.css'

import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink,
} from 'react-vis-force'
import { deps } from './deps'
import {
  hasLegacyStructure,
  reduceToSourceDep,
  moduleDependencyFinder,
  uniqBySource,
} from './helpers'
import { DependencyItem, SourceAndDependsOn } from './Domain'

const gen = require('color-generator')

const modules = deps.modules.map(reduceToSourceDep)

const legacyModules: Array<DependencyItem> = modules.filter(hasLegacyStructure)

const modulesThatDependOn = moduleDependencyFinder(modules)

const sortByDependencyLength = (dep1, dep2) =>
  dep2.modulesThatDependsOn.length - dep1.modulesThatDependsOn.length

const sortedSourceAndDependencies: Array<SourceAndDependsOn> = legacyModules
  .map((legacyModule) => ({
    source: legacyModule.source,
    modulesThatDependsOn: modulesThatDependOn(legacyModule),
  }))
  .sort(sortByDependencyLength)

const allUniqueDependencies = uniqBySource(
  sortedSourceAndDependencies
    .map(({ modulesThatDependsOn }) => modulesThatDependsOn)
    .flat()
)

const radiusBuilder = (largestRadius: number) => (
  sourceAndDependency: SourceAndDependsOn,
  reverse?: boolean
): number =>
  reverse
    ? (1 - sourceAndDependency.modulesThatDependsOn.length / largestRadius) * 70
    : (sourceAndDependency.modulesThatDependsOn.length / largestRadius) * 70

function App() {
  return (
    <div className="App">
      <Graph />
    </div>
  )
}

export default App

export interface IGraphProps {}

export function Graph({}: IGraphProps): JSX.Element {
  const moduleWithMostDepender = sortedSourceAndDependencies[0]
  const radius = radiusBuilder(
    moduleWithMostDepender.modulesThatDependsOn.length
  )
  return (
    <InteractiveForceGraph
      labelAttr="label"
      onSelectNode={(node) => console.log(node)}
      highlightDependencies
      simulationOptions={{
        animate: true,
      }}
    >
      {sortedSourceAndDependencies.map(({ source, modulesThatDependsOn }) => (
        <ForceGraphNode
          key={source}
          node={{
            id: source,
            label: source,
            radius: radius({ source, modulesThatDependsOn }),
          }}
          fill="red"
        />
      ))}
      {allUniqueDependencies
        .filter((module) => !hasLegacyStructure(module))
        .map(({ source }) => (
          <ForceGraphNode
            key={source}
            node={{ id: source, label: source }}
            fill={gen().hexString()}
          />
        ))}
      {sortedSourceAndDependencies
        .map(({ source, modulesThatDependsOn }) =>
          modulesThatDependsOn.map(({ source: target }) => (
            <ForceGraphLink link={{ source, target }} />
          ))
        )
        .flat()
        .filter(Boolean)}
    </InteractiveForceGraph>
  )
}
