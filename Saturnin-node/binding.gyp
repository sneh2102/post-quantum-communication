{
  "targets": [
    {
      "target_name": "saturnin",
      "sources": [
        "src/saturnin.cc",
        "src/saturnin.c",
        "src/internal-saturnin.c",
        "src/aead-common.c"
      ],
      "include_dirs": [
        "<!(node -e \"require('node-addon-api').include\")",
        "."
      ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}