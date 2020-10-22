import React, { Suspense } from 'react'
import { SourceAndDependsOn } from '../domain/Domain'
import { Grid, Box } from '@chakra-ui/core'

const TableData = React.lazy(() => import('./TableData'))

export interface TableProps {
  data: SourceAndDependsOn[]
}

export const Table: React.FC<TableProps> = ({ data }) => {
  // const [sortBy, setSortBy] = React.useState('')
  // const [sortDirection, setSortDirection] = React.useState(-1)
  // React.useEffect(() => {
  //   const newSortedList = data.sort((a, b) => {})
  // }, [data])
  return (
    <Box width="100vw" padding="0px 32px">
      <Suspense fallback={<strong>loading</strong>}>
        <Grid templateColumns="repeat(2, 1fr) 600px" gap={6}>
          <Box as="strong" textAlign="left">
            Component
          </Box>
          <Box as="strong" textAlign="left">
            No of dependencies
          </Box>
          <Box as="strong" textAlign="left">
            Dependencies
          </Box>
          <TableData data={data}></TableData>
        </Grid>
      </Suspense>
    </Box>
  )
}
