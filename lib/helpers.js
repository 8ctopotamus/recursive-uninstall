const { join } = require('path')
const { readdirSync, rmSync, existsSync } = require('fs')
const  inquirer  = require('inquirer')

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

const confirm = async () => {
  const answers = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirmDestroy',
    message: 'View the above list, do you want to continue with the deletion?'
  }])
  if (answers.confirmDestroy == false) {
    console.log('Confirm = False, nothing was deleted')
    process.exit(1)
  } 
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