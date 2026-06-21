# plugin-km — Vue UI

Service-level plugin (`service:km`, "Knowledge"), parent of the knowledge
tools (`km-confluence`). Compiled to `webjars/km/vue/`.

No routes/component (legacy controller was empty). Ships generic i18n +
`renderFeatures` / `renderDetailsKey` / `renderDetailsFeatures` delegation
hooks resolved via `subPluginIdFor` (`service:km:confluence:1` →
`km-confluence`).

```bash
npm install && npm run build && npm run lint && npm test
```
