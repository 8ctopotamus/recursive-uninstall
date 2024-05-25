// todo: these should use commonjs
import { readdirSync } from 'fs'
import { join } from 'path'

function readdirRecusiveSync(dir) {
  const dirs = readdirSync(dir, { withFileTypes: true })
  return dirs.reduce(((acc, file) => {
    const filePath = join(dir, file.name)
    return acc.concat(
      file.isDirectory() ? readdirRecusiveSync(filePath) : filePath
    )
  }), [])
}

const crawl = ({ directory }: { directory }) => {
  const appDirFilelist = readdirRecusiveSync(`./${directory}`)
  return appDirFilelist.reduce((arr, filePath) => {
    const splitFilepath = filePath
    .split('/')
      const fileName = splitFilepath.at(-1)
      if (fileName === 'package.json') {
        const url = filePath.replace(directory, '').replace(/\/\(.*\)/, '').replace('/package.json', '')
        arr.push(url)
      }
      return arr
    }, [])
    .filter(s => !!s)
}

crawl('.')
