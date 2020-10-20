import React from 'react'
import { Button, Wrap, Collapse, Tag } from '@chakra-ui/core'

export interface IListOfModulesProps {
  modules: any[]
}

export function ListOfModules({ modules }: IListOfModulesProps): JSX.Element {
  const [show, setShow] = React.useState(false)

  const handleToggle = () => setShow(!show)

  return (
    <div style={{ position: 'relative' }}>
      {show && (
        <Button
          size="xs"
          colorScheme="teal"
          variant="ghost"
          onClick={handleToggle}
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          hide
        </Button>
      )}
      <Wrap>
        {modules.slice(0, 2).map(({ source }) => (
          <Tag size="md" key={source} variant="solid" colorScheme="teal">
            {source}
          </Tag>
        ))}
        {!show && modules.length > 2 && (
          <Button
            size="xs"
            colorScheme="teal"
            variant="ghost"
            onClick={handleToggle}
          >
            ...
          </Button>
        )}
      </Wrap>
      <Collapse mt={4} isOpen={show} margin="0">
        <Wrap marginTop="4px">
          {modules.slice(2).map(({ source }) => (
            <Tag
              margin="0"
              size="md"
              key={source}
              variant="solid"
              colorScheme="teal"
            >
              {source}
            </Tag>
          ))}
        </Wrap>
      </Collapse>
    </div>
  )
}
