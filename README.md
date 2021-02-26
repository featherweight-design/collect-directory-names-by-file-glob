# Collect Directory Names by File

This was created as a solution for the Featherweight Design Component Library to dynamically find all component test suites based on existing `\*.spec.ts` files. Cypress tests in the library are parallelized through a GH Action matrix strategy. This required maintaining an array of test suites (e.g. `['Button', 'Checkbox']`) for two different GH workflows which was tedious and prone to error.

This GH action allows us to pass a target directory and file glob to dynamically determine which tests suites we should run, automatically detecting when test suites are removed or added.

## Inputs

### `file-glob`

**Required** The file glob of any files for which you want the parent directory name (e.g. `*.spec.ts`, `*.js`, etc.).

### `search-directory`

The location where we should search for files that match the `file-glob` (e.g. `/cypress`, `/`, etc.). Default `/` (root).

## Outputs

### `directory-names`

An array of directory names that house any matching files (e.g. `['Button', 'Components', ...]`).

## Example usage

```yaml
jobs:
  test:
  runs-on: ubuntu-latest
  name: Test Collect Directory Names action
  steps:
    - name: Get directory names
      id: get-directory-names
      uses: actions/collect-directory-names-by-file-glob@v1.1
      with:
        file-glob: '*.spec.ts'
        search-directory: '/cypress'

    - name: Use Directory Names
      run: echo "Directory Names are ${{ steps.get-directory-names.outputs.directory-names}}
```
