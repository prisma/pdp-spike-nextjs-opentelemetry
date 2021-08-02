Repro repo regarding:

https://github.com/open-telemetry/opentelemetry-js/issues/2387

1.  Setup

    ```
    yarn install
    yarn dev
    ```

2.  Open localhost:3000
3.  See error in console

    ```
    TypeError: Cannot read property 'INFO' of undefined
    		at Object.<anonymous> (/Users/jasonkuhrt/foobar/nextjs/node_modules/@opentelemetry/core/build/src/utils/environment.js:69:40)
    		at Module._compile (node:internal/modules/cjs/loader:1095:14)
    		at Object.Module._extensions..js (node:internal/modules/cjs/loader:1124:10)
    		at Module.load (node:internal/modules/cjs/loader:975:32)
    		at Function.Module._load (node:internal/modules/cjs/loader:816:12)
    		at Module.require (node:internal/modules/cjs/loader:999:19)
    		at require (node:internal/modules/cjs/helpers:93:18)
    		at Object.<anonymous> (/Users/jasonkuhrt/foobar/nextjs/node_modules/@opentelemetry/core/build/src/platform/node/environment.js:20:23)
    		at Module._compile (node:internal/modules/cjs/loader:1095:14)
    		at Object.Module._extensions..js (node:internal/modules/cjs/loader:1124:10)
    		at Module.load (node:internal/modules/cjs/loader:975:32)
    		at Function.Module._load (node:internal/modules/cjs/loader:816:12)
    		at Module.require (node:internal/modules/cjs/loader:999:19)
    		at require (node:internal/modules/cjs/helpers:93:18)
    		at Object.<anonymous> (/Users/jasonkuhrt/foobar/nextjs/node_modules/@opentelemetry/core/build/src/platform/node/index.js:28:14)
    		at Module._compile (node:internal/modules/cjs/loader:1095:14)

    ```
