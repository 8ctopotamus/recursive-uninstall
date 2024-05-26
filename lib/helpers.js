const { join } = require('path')
const { readdirSync, rmSync, existsSync } = require('fs')

function recursivelyFindNodeModules(dir) {
  const dirs = readdirSync(dir, { withFileTypes: true })
  return dirs.reduce((locations, dirEnt) => {
    const currPath = join(dirEnt.path, dirEnt.name)
    if (dirEnt.name === 'node_modules') {
      return locations.concat(currPath)
    } else if (dirEnt.isDirectory()) {
      const foo = recursivelyFindNodeModules(currPath)
      return locations.concat(foo)
    } 
    return locations   
  }, [])
}

const search = (directory) => {
  console.log(`recursively searching for node_modules in ${directory}`)
  const locations = recursivelyFindNodeModules(directory)
  console.log(`node_modules found at the following locations:`)
  console.log(locations)
  return locations
}
  
const destroy = nmPaths => nmPaths.forEach((nmPath) => {
  console.log(`Removing node_modules in ${nmPath}`)
  rmSync(nmPath, { recursive: true, force: true })
})

module.exports = {
  search,
  destroy,
}