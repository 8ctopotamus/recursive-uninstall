#!/usr/bin/env node

const { lstatSync } = require('fs')
const { isAbsolute, join } = require('path')
const { search, destroy, confirm } = require('./lib/helpers')

function determineRootPath() {
  let rootPath = process.argv[2] ? process.argv[2] : process.cwd()
  if (!isAbsolute(rootPath))
    rootPath = join(__dirname, rootPath) 
  if (!lstatSync(rootPath).isDirectory()) 
    throw 'path is not a directory'
  return rootPath
}

const init = async () => {
  const root = determineRootPath();
  const nmPaths = search(root);
  while(await confirm() != true){
  }
  destroy(nmPaths);

}


init()