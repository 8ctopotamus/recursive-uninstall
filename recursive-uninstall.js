const dir = process.cwd()
const { readdirSync, rmSync } = require('fs')
const { join } = require('path')
const locations = []

function readdirRecusiveSync(dir) {
  const dirs = readdirSync(dir, { withFileTypes: true })
  dirs.forEach((file) =>{
    if (file.name == 'node_modules'){
      locations.push(join(dir, file.name))
    } else {
    const filePath = join(dir, file.name)
      if (file.isDirectory())  readdirRecusiveSync(filePath)
}})
    return locations
  }

const search = (directory) => {
  const files = readdirRecusiveSync(`${directory}`)
  destroy(files)
}

const destroy = (files) => {
  files.forEach((file)=> {
    rmSync(file, {recursive: true, force: true})
  })
}


search(dir)
