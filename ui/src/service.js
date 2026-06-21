/*
 * Service layer for plugin "km" (Knowledge management, service-level).
 *
 * The legacy `km.js` base was an empty `define({})`; the parent does no
 * rendering itself. It ships generic i18n + delegation of the
 * subscription-row hooks to the km-<tool> sub-plugin — the
 * `vm`/`bt`/`build` pattern.
 */
import { toolPluginId, delegateFeature } from '@ligoj/host'

/** `service:km:confluence:1` → `km-confluence`; null when no tool segment. */
export const subPluginIdFor = toolPluginId

/** Delegate `action` to the km-<tool> sub-plugin; degrade to [] on any failure. */
export const delegateToToolPlugin = (subscription, action) => delegateFeature(subscription, action, 'km')

const service = {
  subPluginIdFor,
  delegateToToolPlugin,
  renderFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderFeatures')
    return out.length ? out : []
  },
  renderDetailsKey(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsKey')
    return out.length ? out : null
  },
  renderDetailsFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsFeatures')
    return out.length ? out : null
  },
}

export default service
