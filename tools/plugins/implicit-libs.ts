import {
  CreateNodesResultV2,
  CreateNodesV2,
  ProjectConfiguration,
} from '@nx/devkit';
import { dirname } from 'node:path/posix';
import { Optional } from 'nx/src/project-graph/plugins';
import { globIterate } from 'glob';
import { readFileSync } from 'fs';

const VALID_LIB_TYPES = ['routes', 'feature', 'data-access', 'util', 'ui'];
type ProjectConfigurationType = Optional<ProjectConfiguration, 'root'>;

export const createNodesV2: CreateNodesV2 = [
  'libs/**/index.ts',
  async (
    indexPathList: Readonly<Array<string>>,
  ): Promise<CreateNodesResultV2> => {
    const showLogs = await hasFileMatching('tools', 'plugins/.islocal');
    if (showLogs) {
      console.log(
        '\n================== Detecting Implicit Lib ==================\n',
      );
    }

    const definedLibraries = getDefinedLibraries('./tsconfig.base.json');
    const results = await Promise.all(
      indexPathList.map((indexPath) =>
        createImplicitLibProjectConfig(indexPath, showLogs, definedLibraries),
      ),
    );

    if (showLogs) {
      console.log(
        '\n================== Found Library (implicit and explicit) ==================\n',
      );
    }
    return results
      .filter(isDefined)
      .map(({ indexPath, projectRoot, projectConfiguration }) => [
        indexPath,
        {
          projects: {
            [projectRoot]: projectConfiguration,
          },
        },
      ]);
  },
];

function getDefinedLibraries(tsconfigPath: string) {
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
  return tsconfig.compilerOptions.paths || {};
}

async function createImplicitLibProjectConfig(
  indexPath: string,
  showLogs: boolean,
  definedLibraries: Record<string, string[]>,
): Promise<
  | {
      indexPath: string;
      projectRoot: string;
      projectConfiguration: ProjectConfigurationType;
    }
  | undefined
> {
  const projectRoot = dirname(indexPath);
  const pathSegments = indexPath.split('/');

  if (await hasFileMatching(projectRoot, '../project.json')) {
    return;
  }

  const libTypePathSegmentIndex = pathSegments.findIndex((segment) =>
    VALID_LIB_TYPES.includes(segment),
  );

  if (libTypePathSegmentIndex === -1) {
    if (showLogs) {
      console.error(
        `\nERROR: Could not find a valid lib type in :\n ${indexPath}\n`,
      );
    }
    return;
  }

  if (libTypePathSegmentIndex !== pathSegments.length - 2) {
    if (showLogs) {
      console.error(
        `\nERROR: Lib type should be the last folder before the index.ts in :\n ${indexPath}\n`,
      );
    }
    return;
  }

  const scope = pathSegments[1];
  const groupingFolders = pathSegments.slice(2, -2);
  const type = pathSegments.at(-2);

  const projectName = [scope, ...groupingFolders, type].join('-');
  const hasTests = await hasFileMatching(projectRoot, '**/*.spec.ts');

  const libraryPath = `@fithelper/${[scope, ...groupingFolders, type].join('/')}`;
  if (showLogs && !Object.keys(definedLibraries).includes(libraryPath)) {
    const addToTsconfigBase = `
      "${libraryPath}": [
          "libs/${[scope, ...groupingFolders, type].join('/')}/index.ts"
        ],
      `;
    console.log(
      'New Library found \n',
      {
        scope,
        groupingFolders,
        type,
        hasTests,
        projectName,
      },
      '\nAdd to tsconfig.base.json :',
      addToTsconfigBase,
      '\n',
    );
  }

  return {
    indexPath,
    projectRoot,
    projectConfiguration: {
      name: projectName,
      sourceRoot: projectRoot,
      projectType: 'library',
      targets: {
        ...createLintTarget(),
        ...(hasTests ? createTestTarget(projectRoot, projectName) : {}),
      },
      tags: [`scope:${scope}`, `type:${type}`],
    },
  };
}

function createLintTarget(): ProjectConfiguration['targets'] {
  return {
    lint: {
      executor: '@nx/eslint:lint',
      cache: true,
      inputs: [
        'default',
        '^default',
        '{workspaceRoot}/.eslintrc.json',
        `{workspaceRoot}/libs/.eslintrc.json`,
        {
          externalDependencies: ['eslint'],
        },
      ],
      outputs: ['{options.outputFile}'],
    },
  };
}

function createTestTarget(
  projectRoot: string,
  projectName: string,
): ProjectConfiguration['targets'] {
  return {
    test: {
      command: `(cd libs && jest --testPathPattern=${projectRoot} --displayName=${projectName} --coverage --coverageDirectory=../coverage/${projectRoot})`,
      cache: true,
      inputs: [
        'default',
        '^default',
        '{workspaceRoot}/jest.config.js',
        {
          externalDependencies: ['jest', 'ts-jest'],
        },
      ],
      outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
    },
  };
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

async function hasFileMatching(
  path: string,
  globPattern: string,
): Promise<boolean> {
  const { done } = await globIterate(globPattern, {
    cwd: path,
  }).next();
  return !done;
}
