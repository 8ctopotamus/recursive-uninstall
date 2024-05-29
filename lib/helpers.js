const { join } = require('path')
const { readdirSync, rmSync } = require('fs')
const readlinePromises = require('readline/promises')

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout
})

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
  console.log(`Recursively searching for node_modules in ${directory}`)
  const locations = recursivelyFindNodeModules(directory)
  console.log(`Found node_modules at the following locations:`)
  console.log(locations)
  return locations
}

async function confirm() {
  const answer = await rl.question('Do you want to continue with the deletion? y/n ')
  if (answer.toLowerCase().includes('y') ) {
    rl.close()
    return true
  }  
  if (answer.toLowerCase() === 'n') {
    console.log('Exiting, nothing was deleted')
    rl.close()
    process.exit(1)
  } 
  return false
}
  
const destroy = nmPaths => nmPaths.forEach((nmPath) => {
  console.log(`Removing node_modules in ${nmPath}`)
  rmSync(nmPath, { recursive: true, force: true })
})

module.exports = {
  search,
  destroy,
  confirm
}