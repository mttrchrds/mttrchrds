/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ShowsImport } from './routes/shows'
import { Route as GamesImport } from './routes/games'
import { Route as StatsRouteImport } from './routes/stats/route'
import { Route as IndexImport } from './routes/index'
import { Route as StatsIndexImport } from './routes/stats/index'
import { Route as StatsShowPlatformsYearsImport } from './routes/stats/show-platforms-years'
import { Route as StatsGameDaysImport } from './routes/stats/game-days'
import { Route as StatsGameCategoriesImport } from './routes/stats/game-categories'

// Create Virtual Routes

const TimelineLazyImport = createFileRoute('/timeline')()
const ProjectsLazyImport = createFileRoute('/projects')()

// Create/Update Routes

const TimelineLazyRoute = TimelineLazyImport.update({
  id: '/timeline',
  path: '/timeline',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/timeline.lazy').then((d) => d.Route))

const ProjectsLazyRoute = ProjectsLazyImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/projects.lazy').then((d) => d.Route))

const ShowsRoute = ShowsImport.update({
  id: '/shows',
  path: '/shows',
  getParentRoute: () => rootRoute,
} as any)

const GamesRoute = GamesImport.update({
  id: '/games',
  path: '/games',
  getParentRoute: () => rootRoute,
} as any)

const StatsRouteRoute = StatsRouteImport.update({
  id: '/stats',
  path: '/stats',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const StatsIndexRoute = StatsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => StatsRouteRoute,
} as any)

const StatsShowPlatformsYearsRoute = StatsShowPlatformsYearsImport.update({
  id: '/show-platforms-years',
  path: '/show-platforms-years',
  getParentRoute: () => StatsRouteRoute,
} as any)

const StatsGameDaysRoute = StatsGameDaysImport.update({
  id: '/game-days',
  path: '/game-days',
  getParentRoute: () => StatsRouteRoute,
} as any)

const StatsGameCategoriesRoute = StatsGameCategoriesImport.update({
  id: '/game-categories',
  path: '/game-categories',
  getParentRoute: () => StatsRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/stats': {
      id: '/stats'
      path: '/stats'
      fullPath: '/stats'
      preLoaderRoute: typeof StatsRouteImport
      parentRoute: typeof rootRoute
    }
    '/games': {
      id: '/games'
      path: '/games'
      fullPath: '/games'
      preLoaderRoute: typeof GamesImport
      parentRoute: typeof rootRoute
    }
    '/shows': {
      id: '/shows'
      path: '/shows'
      fullPath: '/shows'
      preLoaderRoute: typeof ShowsImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      id: '/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsLazyImport
      parentRoute: typeof rootRoute
    }
    '/timeline': {
      id: '/timeline'
      path: '/timeline'
      fullPath: '/timeline'
      preLoaderRoute: typeof TimelineLazyImport
      parentRoute: typeof rootRoute
    }
    '/stats/game-categories': {
      id: '/stats/game-categories'
      path: '/game-categories'
      fullPath: '/stats/game-categories'
      preLoaderRoute: typeof StatsGameCategoriesImport
      parentRoute: typeof StatsRouteImport
    }
    '/stats/game-days': {
      id: '/stats/game-days'
      path: '/game-days'
      fullPath: '/stats/game-days'
      preLoaderRoute: typeof StatsGameDaysImport
      parentRoute: typeof StatsRouteImport
    }
    '/stats/show-platforms-years': {
      id: '/stats/show-platforms-years'
      path: '/show-platforms-years'
      fullPath: '/stats/show-platforms-years'
      preLoaderRoute: typeof StatsShowPlatformsYearsImport
      parentRoute: typeof StatsRouteImport
    }
    '/stats/': {
      id: '/stats/'
      path: '/'
      fullPath: '/stats/'
      preLoaderRoute: typeof StatsIndexImport
      parentRoute: typeof StatsRouteImport
    }
  }
}

// Create and export the route tree

interface StatsRouteRouteChildren {
  StatsGameCategoriesRoute: typeof StatsGameCategoriesRoute
  StatsGameDaysRoute: typeof StatsGameDaysRoute
  StatsShowPlatformsYearsRoute: typeof StatsShowPlatformsYearsRoute
  StatsIndexRoute: typeof StatsIndexRoute
}

const StatsRouteRouteChildren: StatsRouteRouteChildren = {
  StatsGameCategoriesRoute: StatsGameCategoriesRoute,
  StatsGameDaysRoute: StatsGameDaysRoute,
  StatsShowPlatformsYearsRoute: StatsShowPlatformsYearsRoute,
  StatsIndexRoute: StatsIndexRoute,
}

const StatsRouteRouteWithChildren = StatsRouteRoute._addFileChildren(
  StatsRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/stats': typeof StatsRouteRouteWithChildren
  '/games': typeof GamesRoute
  '/shows': typeof ShowsRoute
  '/projects': typeof ProjectsLazyRoute
  '/timeline': typeof TimelineLazyRoute
  '/stats/game-categories': typeof StatsGameCategoriesRoute
  '/stats/game-days': typeof StatsGameDaysRoute
  '/stats/show-platforms-years': typeof StatsShowPlatformsYearsRoute
  '/stats/': typeof StatsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/games': typeof GamesRoute
  '/shows': typeof ShowsRoute
  '/projects': typeof ProjectsLazyRoute
  '/timeline': typeof TimelineLazyRoute
  '/stats/game-categories': typeof StatsGameCategoriesRoute
  '/stats/game-days': typeof StatsGameDaysRoute
  '/stats/show-platforms-years': typeof StatsShowPlatformsYearsRoute
  '/stats': typeof StatsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/stats': typeof StatsRouteRouteWithChildren
  '/games': typeof GamesRoute
  '/shows': typeof ShowsRoute
  '/projects': typeof ProjectsLazyRoute
  '/timeline': typeof TimelineLazyRoute
  '/stats/game-categories': typeof StatsGameCategoriesRoute
  '/stats/game-days': typeof StatsGameDaysRoute
  '/stats/show-platforms-years': typeof StatsShowPlatformsYearsRoute
  '/stats/': typeof StatsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/stats'
    | '/games'
    | '/shows'
    | '/projects'
    | '/timeline'
    | '/stats/game-categories'
    | '/stats/game-days'
    | '/stats/show-platforms-years'
    | '/stats/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/games'
    | '/shows'
    | '/projects'
    | '/timeline'
    | '/stats/game-categories'
    | '/stats/game-days'
    | '/stats/show-platforms-years'
    | '/stats'
  id:
    | '__root__'
    | '/'
    | '/stats'
    | '/games'
    | '/shows'
    | '/projects'
    | '/timeline'
    | '/stats/game-categories'
    | '/stats/game-days'
    | '/stats/show-platforms-years'
    | '/stats/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  StatsRouteRoute: typeof StatsRouteRouteWithChildren
  GamesRoute: typeof GamesRoute
  ShowsRoute: typeof ShowsRoute
  ProjectsLazyRoute: typeof ProjectsLazyRoute
  TimelineLazyRoute: typeof TimelineLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  StatsRouteRoute: StatsRouteRouteWithChildren,
  GamesRoute: GamesRoute,
  ShowsRoute: ShowsRoute,
  ProjectsLazyRoute: ProjectsLazyRoute,
  TimelineLazyRoute: TimelineLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/stats",
        "/games",
        "/shows",
        "/projects",
        "/timeline"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/stats": {
      "filePath": "stats/route.tsx",
      "children": [
        "/stats/game-categories",
        "/stats/game-days",
        "/stats/show-platforms-years",
        "/stats/"
      ]
    },
    "/games": {
      "filePath": "games.tsx"
    },
    "/shows": {
      "filePath": "shows.tsx"
    },
    "/projects": {
      "filePath": "projects.lazy.tsx"
    },
    "/timeline": {
      "filePath": "timeline.lazy.tsx"
    },
    "/stats/game-categories": {
      "filePath": "stats/game-categories.tsx",
      "parent": "/stats"
    },
    "/stats/game-days": {
      "filePath": "stats/game-days.tsx",
      "parent": "/stats"
    },
    "/stats/show-platforms-years": {
      "filePath": "stats/show-platforms-years.tsx",
      "parent": "/stats"
    },
    "/stats/": {
      "filePath": "stats/index.tsx",
      "parent": "/stats"
    }
  }
}
ROUTE_MANIFEST_END */
