const fs = require('fs')
const path = require('path')
const os = require('os')

const WINFSP = path.join(process.env['ProgramFiles(x86)'], 'WinFsp')
const is64Bit = os.arch() === 'x64'
const lib = path.join(WINFSP, is64Bit ? 'lib/winfsp-x64.lib' : 'lib/winfsp-x86.lib')
const include = path.join(WINFSP, 'inc/fuse')

module.exports = {
  lib,
  include,
  configure,
  unconfigure,
  beforeMount,
  beforeUnmount,
  isConfigured
}

function beforeMount (cb) {
  if (!cb) cb = noop
  process.nextTick(cb)
}

function beforeUnmount (cb) {
  if (!cb) cb = noop
  process.nextTick(cb)
}

function unconfigure (cb) {
  if (!cb) cb = noop
  process.nextTick(cb)
}

function configure (cb) {
  if (!cb) cb = noop
  process.nextTick(cb)
}

function isConfigured (cb) {
  fs.stat(lib, function (err) {
    if (err) {
      if (err.code !== 'ENOENT') return cb(null, false)

      return cb(err)
    }
    cb(null, true)
  })
}

function noop () { }
