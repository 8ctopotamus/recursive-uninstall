// todo: these should use commonjs
// import { readdirSync } from 'fs'
// import { join } from 'path'
const dir = process.cwd()
const { readdirSync } = require('fs')
const { join } = require('path')

function readdirRecusiveSync(dir) {
  const dirs = readdirSync(dir, { withFileTypes: true })
  return dirs.reduce(((acc, file) => {
    console.log(file.name)
    if (file.name == 'node_modules'){
      return file.name
    }
    const filePath = join(dir, file.name)
      if (file.isDirectory())  readdirRecusiveSync(filePath)
  }), [])
}

const crawl = (directory) => {
  const file = readdirRecusiveSync(`${directory}`)
  console.log(file)
      if (file === 'node_modules') {
        console.log('succes You stink')
        const url = filePath.replace(directory, '').replace(/\/\(.*\)/, '').replace('/node_modules', '')
        arr.push(url)
      }
      // return arr
}

crawl(dir)
