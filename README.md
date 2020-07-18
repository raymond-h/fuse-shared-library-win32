# fuse-shared-library-win32 (Work in progress)

Install [WinFsp](https://github.com/billziss-gh/winfsp/releases) (both Core
and Developer components), then...

```
npm install fuse-shared-library-win32
```

## Usage

``` js
const winFspFuse = require('fuse-shared-library-win32')

console.log(winFspFuse.lib) // path to the .lib file to link with
console.log(winFspFuse.include) // path to the include folder
console.log(winFspFuse.bin) // path to the .dll file

// pthreads (used by fuse-native)
console.log(winFspFuse.pthreads.lib) // path to the .lib file to link with
console.log(winFspFuse.pthreads.include) // path to the include folder
console.log(winFspFuse.pthreads.bin) // path to the .dll file
```

You should move the shared library next to your program after linking it
as that is where your binary will try and load it from.

Using a GYP file this can be done like this:

```
{
  "targets": [{
    "target_name": "fuse_example",
    "include_dirs": [
      # include it like this
      "<!@(node -e \"require('fuse-shared-library-win32/include')\")"
    ],
    "libraries": [
      # link it like this
      "<!@(node -e \"require('fuse-shared-library-win32/lib')\")"
    ],
    "sources": [
      "your_program.cc"
    ]
  }, {
    # setup a postinstall target that copies the shared library
    # next to the produces node library
    "target_name": "postinstall",
    "type": "none",
    "dependencies": ["fuse_example"],
    "copies": [{
      "destination": "build/Release",
      # expanding a variable to a list here does not seem to work somehow (node-gyp 5.1.0)
      "files": [
        "<!(node -e \"console.log(require('fuse-shared-library-win32').bin)\")",
        "<!(node -e \"console.log(require('fuse-shared-library-win32').pthreads.bin)\")"
      ],
    }]
  }]
}
```

## License

MIT
