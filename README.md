# fuse-shared-library-win32 (Work in progress)
A module containing the DLL needed to run WinFsp on Windows.

```
npm install fuse-shared-library-win32
```

## Usage

``` js
const winFspFuse = require('fuse-shared-library-win32')

console.log(winFspFuse.lib) // path to the .lib file to link with
console.log(winFspFuse.include) // path to the include folder
// TODO path to DLL file
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
      "<!(node -e \"require('fuse-shared-library-win32/include')\")"
    ],
    "libraries": [
      # link it like this
      "<!(node -e \"require('fuse-shared-library-win32/lib')\")"
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
      # TODO should actually copy the DLL rather than the linked .lib file
      "files": [ "<!(node -e \"require('fuse-shared-library-win32/lib')\")" ],
    }]
  }]
}
```

## License

MIT
