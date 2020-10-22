import React from 'react'
import { SourceAndDependsOn } from '../domain/Domain'
import { searchList } from '../app/searchList'

export const useTableData = (
  initialData: SourceAndDependsOn[],
  searchText: string
) => {
  const [data, setData] = React.useState<SourceAndDependsOn[]>(initialData)

  React.useEffect(() => {
    const searchedList = searchList(initialData, searchText)
    if (searchText.trim() === '') {
      setData(initialData)
      return
    }
    setData(searchedList || [])
  }, [initialData, searchText])
  return [data]
}
