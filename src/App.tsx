import React from 'react'
import './App.css'
import { Graph } from './views/Graph'
import { Table } from './views/Table'
import { ChakraProvider } from '@chakra-ui/core'

import { sortedSourceAndDependencies } from './app/VisData'
import { SearchRow } from './views/SearchRow'
import { useTableData } from './state/useTableData'

function App() {
  const [searchText, setSearchText] = React.useState('')
  const [data] = useTableData(sortedSourceAndDependencies, searchText)
  return (
    <div className="App">
      <ChakraProvider>
        <Graph />
        <SearchRow
          searchText={searchText}
          setSearchText={setSearchText}
        ></SearchRow>
        <Table data={data} />
      </ChakraProvider>
    </div>
  )
}

export default App
