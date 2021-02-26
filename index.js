const core = require('@actions/core');
const glob = require('glob');
const path = require('path');

function findFromDirectory(searchDirectory, fileGlob) {
  const fileNames = glob.sync(fileGlob, { cwd: searchDirectory });
  const directoryNames = fileNames.map((fileName) =>
    path.basename(path.dirname(fileName))
  );

  return directoryNames;
}

try {
  const searchDirectory = core.getInput('search-directory');
  const fileGlob = core.getInput('file-glob');

  const directoryNames = findFromDirectory(searchDirectory, fileGlob);

  core.setOutput('directory-names', directoryNames);
} catch (error) {
  core.setFailed(error.message);
}
