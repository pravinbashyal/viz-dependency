import React from 'react'
import './App.css'
import { Graph } from './Graph'
import { Table } from './Table'
import { ChakraProvider } from '@chakra-ui/core'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Graph />
        <Table />
      </ChakraProvider>
    </div>
  )
}

export default App
