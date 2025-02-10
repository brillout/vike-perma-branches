export { onLoad }

import { assertIsNotBrowser } from '../../utils/assertIsNotBrowser.js'
import { assertIsNotProductionRuntime, markSetup_vikeVitePlugin } from '../../utils/assertSetup.js'
import { assertNodeVersion } from '../../utils/assertNodeVersion.js'
import { assertVersion } from '../../utils/assertVersion.js'
import { version } from 'vite'
import pc from '@brillout/picocolors'

function onLoad() {
  markSetup_vikeVitePlugin()
  assertIsNotBrowser()
  assertNodeVersion()
  console.log(`The value of ${pc.cyan("import { version } from 'vite'")} at node_modules/vike/dist/esm/node/plugin/onLoad.js is ${pc.bold(version)}`)
  // package.json#peerDependencies isn't enough as users often ignore it
  assertVersion('Vite', version, '5.1.0')
  // Ensure we don't bloat the server runtime with heavy dependencies such Vite and esbuild
  assertIsNotProductionRuntime()
}
