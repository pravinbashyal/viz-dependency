import React, { useEffect } from 'react'
import { Button, Wrap, Tag } from '@chakra-ui/core'
import { useAnimate } from 'react-simple-animate'

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
        {(show ? modules : modules.slice(0, 2)).map(({ source }) => (
          <ModuleTag source={source} key={source}></ModuleTag>
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
    </div>
  )
}

const ModuleTag = ({ source }: { source: string }) => {
  const { style, play } = useAnimate({
    start: { opacity: 0 },
    end: { opacity: 1 },
  })
  useEffect(() => play(true), [play])
  return (
    <Tag
      size="md"
      key={source}
      variant="solid"
      colorScheme="teal"
      style={style}
    >
      {source}
    </Tag>
  )
}
