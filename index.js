const fs = require('fs')
const path = require('path')
const os = require('os')

const is64Bit = os.arch() === 'x64'

const WINFSP = path.join(process.env['ProgramFiles(x86)'], 'WinFsp')
const lib = path.join(WINFSP, is64Bit ? 'lib/winfsp-x64.lib' : 'lib/winfsp-x86.lib')
const bin = path.join(WINFSP, is64Bit ? 'bin/winfsp-x64.dll' : 'bin/winfsp-x86.dll')
const include = path.join(WINFSP, 'inc/fuse')

const PTHREADS4WIN = path.join(__dirname, is64Bit ? 'pthreads_x64-windows' : 'pthreads_x86-windows')
const pthreads = {
  lib: path.join(PTHREADS4WIN, 'lib/pthreadVC3.lib'),
  include: path.join(PTHREADS4WIN, 'include'),
  bin: path.join(PTHREADS4WIN, 'bin/pthreadVC3.dll')
}

module.exports = {
  lib,
  include,
  bin,
  pthreads,
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
