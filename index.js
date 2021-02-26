const core = require('@actions/core');
const glob = require('glob');
const path = require('path');

const getDirectoryNames = (fileNames) =>
  fileNames.map((fileName) => path.basename(path.dirname(fileName)));

function findFromDirectory({ searchDirectory, fileGlob, unique }) {
  const adjustedSearchPath = path.resolve(__dirname, searchDirectory);
  core.debug({ adjustedSearchPath });

  const fileNames = glob.sync(fileGlob, { cwd: adjustedSearchPath });
  core.debug({ fileNames });

  const directoryNames = unique
    ? [...new Set(getDirectoryNames(fileNames))]
    : getDirectoryNames(fileNames);
  core.debug({ directoryNames });

  return directoryNames;
}

try {
  const searchDirectory = core.getInput('search-directory');
  const fileGlob = core.getInput('file-glob');
  const unique = JSON.parse(core.getInput('unique'));

  const directoryNames = findFromDirectory({
    searchDirectory,
    fileGlob,
    unique,
  });

  core.setOutput('directory-names', directoryNames);
} catch (error) {
  core.setFailed(error.message);
}
