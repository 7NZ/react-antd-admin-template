# React Antd admin

A simple react antd admin boilerplate build width typescript 5, react 18, antd 5, react-router 6, vite 4.

## Feature

- Dynamic Route

    remote route data like below:

    ```json
    {
        "data": [
            {
                "name": "dynamicPage1",
                "url": "/dynamicPage1",
                "key": "dynamicp1"
            },
            {
                "name": "dynamicPage2",
                "url": "/dynamicPage2",
                "key": "dynamicp2"
            },
            {
                "name": "dynamicNest",
                "url": "/dynamicNest",
                "key": "nest",
                "children": [
                    {
                        "name": "dynamicSubpage",
                        "url": "/dynamicNest/subpage",
                        "key": "dynamicpsub"
                    }
                ]
            }
        ]
    }
    ```

    see detail in `src/App.tsx`.

## build diffirent environment use corresponding env variables

The env files defined in .env.xxx, You can add other env files and corresponding command in package.json.
see <https://vitejs.dev/guide/env-and-mode.html#env-files>
