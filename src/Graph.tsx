import React from 'react'
import { SourceAndDependsOn } from './Domain'
import { sortedSourceAndDependencies, allUniqueDependencies } from './VisData'
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink,
} from 'react-vis-force'
import { hasLegacyStructure, log } from './helpers'
import { Wrap, Box, Container } from '@chakra-ui/core'

const gen = require('color-generator')

const radiusBuilder = (largestRadius: number) => (
  sourceAndDependency: SourceAndDependsOn,
  reverse?: boolean
): number =>
  reverse
    ? (1 - sourceAndDependency.modulesThatDependsOn.length / largestRadius) * 70
    : (sourceAndDependency.modulesThatDependsOn.length / largestRadius) * 70

export function Graph(): JSX.Element {
  const moduleWithMostDepender = sortedSourceAndDependencies[0]
  const radius = radiusBuilder(
    moduleWithMostDepender.modulesThatDependsOn.length
  )
  return (
    <Container centerContent marginTop="32px">
      <Box border="1px solid rgba(50,50,50,0.4)" width="700px">
        <InteractiveForceGraph
          labelAttr="label"
          onSelectNode={(node) => console.log(node)}
          highlightDependencies
          simulationOptions={{
            animate: true,
            height: 500,
            width: 700,
          }}
          zoom
        >
          {sortedSourceAndDependencies.map(
            ({ source, modulesThatDependsOn }) => (
              <ForceGraphNode
                key={source}
                node={{
                  id: source,
                  label: source,
                  radius: radius({ source, modulesThatDependsOn }),
                }}
                fill="red"
              />
            )
          )}
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
      </Box>
    </Container>
  )
}
