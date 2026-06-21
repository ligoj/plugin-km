import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { pluginRegistry, useI18nStore } from '@ligoj/host'
import def from '../index.js'
import { subPluginIdFor } from '../service.js'
import confluenceDef from '../../../../plugin-km-confluence/ui/src/index.js'

beforeEach(() => { setActivePinia(createPinia()) })

describe('plugin-km manifest', () => {
  it('exports service-level fields (no requires, no routes)', () => {
    expect(def.id).toBe('km')
    expect(def.requires).toBeUndefined()
    expect(def.routes).toBeUndefined()
    expect(def.meta).toMatchObject({ icon: expect.any(String), color: expect.any(String) })
  })
  it('install() merges i18n', () => {
    const i18n = useI18nStore()
    def.install()
    expect(i18n.t('service:km')).toBe('Knowledge')
  })
  it('feature() throws for unknown action', () => {
    expect(() => def.feature('nope')).toThrow(/no feature "nope"/)
  })
  it('renders nothing without a registered tool', () => {
    expect(def.feature('renderFeatures', { node: { id: 'service:km:confluence:1' }, parameters: {} })).toEqual([])
    expect(def.feature('renderDetailsKey', { node: { id: 'service:km:confluence:1' }, parameters: {} })).toBeNull()
  })
})

describe('subPluginIdFor', () => {
  it('maps tool node → km-<tool>', () => {
    expect(subPluginIdFor({ node: { id: 'service:km:confluence:1' } })).toBe('km-confluence')
  })
  it('null without a tool segment', () => {
    expect(subPluginIdFor({ node: { id: 'service:km' } })).toBeNull()
  })
})

describe('plugin-km → plugin-km-confluence delegation', () => {
  beforeEach(() => {
    def.install(); confluenceDef.install()
    pluginRegistry.register('km-confluence', confluenceDef)
  })
  afterEach(() => { pluginRegistry.remove('km-confluence') })

  it('appends the Confluence space link to renderFeatures', () => {
    const result = def.feature('renderFeatures', {
      node: { id: 'service:km:confluence:1' },
      parameters: { 'service:km:confluence:url': 'https://wiki.example.org', 'service:km:confluence:space': 'DIG' },
    })
    expect(result.length).toBe(1)
    expect(result[0].props.href).toBe('https://wiki.example.org/display/DIG')
  })

  it('does not delegate for a non-confluence tool', () => {
    const result = def.feature('renderFeatures', {
      node: { id: 'service:km:other:1' },
      parameters: { 'service:km:confluence:url': 'https://wiki.example.org', 'service:km:confluence:space': 'DIG' },
    })
    expect(result).toEqual([])
  })
})
