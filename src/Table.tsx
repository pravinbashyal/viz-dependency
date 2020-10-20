import * as React from 'react'
import { sortedSourceAndDependencies } from './VisData'
import { SourceAndDependsOn } from './Domain'
import { InputGroup, InputLeftElement, Input, Grid, Box } from '@chakra-ui/core'
import { SearchIcon } from '@chakra-ui/icons'

import Fuse from 'fuse.js'
import { ListOfModules } from './ListOfModules'

export interface TableProps {}

const searchList = (
  list: SourceAndDependsOn[],
  pattern: string
): SourceAndDependsOn[] => {
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ['source'],
  }

  const fuse = new Fuse(list, options)

  return fuse.search(pattern).map(({ item }) => item)
}

export const Table: React.FC<TableProps> = () => {
  // const [sortBy, setSortBy] = React.useState('')
  // const [sortDirection, setSortDirection] = React.useState(-1)
  const [data, setData] = React.useState<SourceAndDependsOn[]>(
    sortedSourceAndDependencies
  )

  const [searchText, setSearchText] = React.useState('')

  React.useEffect(() => {
    const searchedList = searchList(data, searchText)
    if (searchText.trim() === '') {
      setData(sortedSourceAndDependencies)
      return
    }
    setData(searchedList)
  }, [searchText])
  // React.useEffect(() => {
  //   const newSortedList = data.sort((a, b) => {})
  // }, [data])
  return (
    <Box width="100vw" padding="0px 32px">
      <InputGroup margin="16px" width="300px">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </InputGroup>
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
      </Grid>
    </Box>
  )
}
