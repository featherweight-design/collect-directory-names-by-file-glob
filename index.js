const core = require('@actions/core');
const glob = require('glob');
const path = require('path');

function findFromDirectory(searchDirectory, fileGlob) {
  // const adjustedSearchPath = `../component-library${searchDirectory}`
  const adjustedSearchPath = `${process.env.GITHUB_WORKSPACE}${searchDirectory}`
  console.log({ adjustedSearchPath });
  console.log(process.cwd())
  console.log(path.resolve(__dirname, adjustedSearchPath))

  const fileNames = glob.sync(fileGlob, { cwd: path.resolve(__dirname, adjustedSearchPath) });
  console.log({ fileNames });

  const directoryNames = fileNames.map((fileName) =>
    path.basename(path.dirname(fileName))
  );
  console.log({ directoryNames });

  return directoryNames;
}

try {
  const searchDirectory = core.getInput('search-directory');
  const fileGlob = core.getInput('file-glob');

  console.log('Args are:');
  console.log({ searchDirectory, fileGlob });
  console.log(process.env)

  const directoryNames = findFromDirectory(searchDirectory, fileGlob);
  core.setOutput('directory-names', directoryNames);
} catch (error) {
  core.setFailed(error.message);
}

// module.exports = findFromDirectory('/src/cypress', '**/*.spec.ts')
