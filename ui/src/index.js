/*
 * Plugin "km" — Knowledge management (service-level).
 *
 * Parent of the km-<tool> plugins (km-confluence). Ships generic i18n +
 * the parent→child delegation hooks resolved via `subPluginIdFor`. No
 * routes/component (the legacy km controller was an empty define({})).
 */
import { useI18nStore } from '@ligoj/host'
import enMessages from './i18n/en.js'
import frMessages from './i18n/fr.js'
import service from './service.js'

const features = {
  renderFeatures: service.renderFeatures,
  renderDetailsKey: service.renderDetailsKey,
  renderDetailsFeatures: service.renderDetailsFeatures,
}

export default {
  id: 'km',
  label: 'Knowledge',
  install() {
    const i18n = useI18nStore()
    i18n.merge(enMessages, 'en')
    i18n.merge(frMessages, 'fr')
  },
  feature(action, ...args) {
    const fn = features[action]
    if (!fn) throw new Error(`Plugin "km" has no feature "${action}"`)
    return fn(...args)
  },
  service,
  meta: { icon: 'mdi-book-open-variant', color: 'teal-darken-1' },
}

export { service }
