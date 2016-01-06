#!/usr/bin/env babel-node
// cat functionality code.

var argumentLength = process.argv.length
var fs = require('pn/fs')
require('songbird')
var path = require('path')


async function ls (){

if(argumentLength > 1){

	var directory = process.argv[2]
	var rec = process.argv[3]
	
	try {
     
		//1) check if the given argument is a file?
		var stat = await fs.promise.stat(directory)

		if(stat.isDirectory()){

			if(!rec){

				// if yes, show the file content.
				let fileNames = await fs.readdir(directory)

				for (let fileName of fileNames) {
				    let filePath = path.join(directory, fileName)
				    var filePathStat = await fs.promise.stat(filePath)
				    if(filePathStat.isFile()){
				    	console.log(filePath)
				    }
				}
			}else{
				list(directory)
			}

		}else{

			// if not, show the error message
			console.log(directory + '\t is not a directory')
		}

    } catch (e) {
        console.log(e.stack)
    }

	process.stdout.write('\n')
}

}

async function list(rootDir){

	var stat = await fs.promise.stat(rootDir)

	if(stat.isFile()){
		console.log(rootDir)
		return
	}else{
		let fileNames = await fs.readdir(rootDir)

		console.log(fileNames)

		for (let fileName of fileNames) {
		    let filePath = path.join(rootDir, fileName)
		    console.log(filePath)
            await ls(filePath)
	    }
	}
}

ls()
