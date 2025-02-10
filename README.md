Reproduction showcasing the Vite version mismatch issue as described at https://github.com/vitejs/vite/pull/19355.

```bash
git clone git@github.com:brillout/vike-perma-branches
cd vike-perma-branches/
git checkout vite-repro-19355
pnpm install
pnpm build
cd test-deprecated-design/vue-full/
pnpm run dev
```

Same as single line (copy & paste me):

```
git clone git@github.com:brillout/vike-perma-branches && cd vike-perma-branches/ && git checkout vite-repro-19355 && pnpm install && pnpm build && cd test-deprecated-design/vue-full/ && pnpm run dev
```

Which logs:

```
...
The value of `import { version } from 'vite'` at node_modules/vike/dist/esm/node/plugin/onLoad.js is 6.1.0
...
  VITE v5.1.0  ready in 1060 ms
  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
...
```

Observe how `import { version } from 'vite'` returns `6.1.0` while the version of the actual running Vite copy is `5.1.0` as attested by `VITE v5.1.0  ready in 1060 ms`.
