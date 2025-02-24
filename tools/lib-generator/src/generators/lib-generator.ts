import {
  formatFiles,
  generateFiles,
  names,
  readJson,
  Tree,
  writeJson,
} from '@nx/devkit';
import * as path from 'node:path';
import { LibGeneratorGeneratorSchema } from './schema';

async function updateTsConfig(tree: Tree, options: any) {
  const tsConfigPath = 'tsconfig.base.json';

  if (!tree.exists(tsConfigPath)) {
    console.warn(`The file ${tsConfigPath} does not exist.`);
    return;
  }

  const tsConfig = readJson(tree, tsConfigPath);

  tsConfig.compilerOptions = tsConfig.compilerOptions || {};
  tsConfig.compilerOptions.paths = tsConfig.compilerOptions.paths || {};
  tsConfig.compilerOptions.paths[options.alias] = [options.path];

  // Write the updated tsconfig back to the file
  writeJson(tree, tsConfigPath, tsConfig);

  // Optionally format files to ensure proper formatting
  await formatFiles(tree);
}

export async function libGeneratorGenerator(
  tree: Tree,
  options: LibGeneratorGeneratorSchema,
) {
  const workspaceRoot = tree.root;

  const currentWorkingDir = process.cwd();
  const relativePathFromRoot = path.relative(workspaceRoot, currentWorkingDir);

  const normalizedOptions = {
    ...options,
    libraryType: names(options.libraryType).fileName,
    directory: relativePathFromRoot,
  };

  const projectRoot = path.join(
    normalizedOptions.directory,
    normalizedOptions.groupingFolder,
    normalizedOptions.libraryType,
  );

  const directoryWithoutLibs = normalizedOptions.directory.replace(
    /^libs$|^libs\/|\/$/g,
    '',
  );
  const groupingFolderWithoutLibs = normalizedOptions.groupingFolder.replace(
    /^libs\/|\/$/g,
    '',
  );

  const alias =
    directoryWithoutLibs.length > 0
      ? `@fithelper/${directoryWithoutLibs}/${groupingFolderWithoutLibs}/${normalizedOptions.libraryType}`
      : `@fithelper/${groupingFolderWithoutLibs}/${normalizedOptions.libraryType}`;

  const libPath = path.join(projectRoot, 'index.ts');

  console.log('Your new library alias (tsconfig.base.json) will be :', alias);
  console.log('Your new library entry-point will be :', libPath);

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await updateTsConfig(tree, {
    alias,
    path: libPath,
  });
}

export default libGeneratorGenerator;
