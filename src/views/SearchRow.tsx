import React from 'react'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/core'
import { SearchIcon } from '@chakra-ui/icons'

export interface SearchRowProps {
  searchText: string
  setSearchText: (searchText: string) => void
}

export function SearchRow({
  searchText,
  setSearchText,
}: SearchRowProps): JSX.Element {
  return (
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
  )
}
