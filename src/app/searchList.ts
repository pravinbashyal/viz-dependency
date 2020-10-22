import { debounce } from 'lodash'
import { SourceAndDependsOn } from '../domain/Domain'
import Fuse from 'fuse.js'
import { log } from './helpers'

export const searchList = debounce(
  (list: SourceAndDependsOn[], pattern: string): SourceAndDependsOn[] => {
    const options = {
      isCaseSensitive: false,
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

    return log('search')(fuse.search(pattern).map(({ item }) => item))
  },
  300
)
