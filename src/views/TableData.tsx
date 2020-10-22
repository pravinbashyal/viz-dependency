import React from 'react'
import { ListOfModules } from './ListOfModules'
import { Box } from '@chakra-ui/core'
import { SourceAndDependsOn } from '../domain/Domain'

const TableData = ({ data }: { data: SourceAndDependsOn[] }) => (
  <>
    {data.map(({ source, modulesThatDependsOn }) => (
      <React.Fragment key={source}>
        <Box as="p" textAlign="left">
          {source}
        </Box>
        <Box as="p" textAlign="left">
          {modulesThatDependsOn.length}
        </Box>
        <ListOfModules modules={modulesThatDependsOn} />
      </React.Fragment>
    ))}
  </>
)

export default TableData
