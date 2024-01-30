export { config }

import type { Config } from 'vike/types'

// https://vike.dev/config
const config = {
  passToClient: ['someAsyncProps'],
  hydrationCanBeAborted: true,
  // https://vike.dev/meta
  meta: {
    // Define new setting 'title'
    title: {
      env: { server: true, client: true }
    },
    // Define new setting 'dataIsomorph'
    dataIsomorph: {
      env: { config: true },
      effect({ configDefinedAt, configValue }) {
        if (typeof configValue !== 'boolean') {
          throw new Error(`${configDefinedAt} should be a boolean`)
        }
        if (configValue) {
          return {
            meta: {
              data: {
                // We override Vike's default behavior of always loading/executing data() on the server-side.
                // If we set dataIsomorph to true, then data() is loaded/executed in the browser as well, allowing us to fetch data direcly from the browser upon client-side navigation (without involving our Node.js/Edge server at all).
                env: { server: true, client: true }
              }
            }
          }
        }
      }
    }
  }
} satisfies Config

// https://vike.dev/meta#typescript
declare global {
  namespace Vike {
    interface Config {
      /** The page's `<title>` */
      title?: string
    }
  }
}
