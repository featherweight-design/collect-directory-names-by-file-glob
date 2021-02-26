const core = require('@actions/core');
const github = require('@actions/github');
const glob = require('glob');
const path = require('path');

function findFromDirectory(searchDirectory, fileGlob) {
  const adjustedSearchPath = path.resolve(__dirname, searchDirectory);
  console.log({ adjustedSearchPath });

  const fileNames = glob.sync(fileGlob, { cwd: adjustedSearchPath });
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

  const payload = JSON.stringify(github.context, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
