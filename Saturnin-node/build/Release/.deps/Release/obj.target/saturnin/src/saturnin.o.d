cmd_Release/obj.target/saturnin/src/saturnin.o := g++ -o Release/obj.target/saturnin/src/saturnin.o ../src/saturnin.cc '-DNODE_GYP_MODULE_NAME=saturnin' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DNAPI_DISABLE_CPP_EXCEPTIONS' '-DBUILDING_NODE_EXTENSION' -I/home/sneh/.cache/node-gyp/18.20.4/include/node -I/home/sneh/.cache/node-gyp/18.20.4/src -I/home/sneh/.cache/node-gyp/18.20.4/deps/openssl/config -I/home/sneh/.cache/node-gyp/18.20.4/deps/openssl/openssl/include -I/home/sneh/.cache/node-gyp/18.20.4/deps/uv/include -I/home/sneh/.cache/node-gyp/18.20.4/deps/zlib -I/home/sneh/.cache/node-gyp/18.20.4/deps/v8/include -I../. -I../.  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++17 -MMD -MF ./Release/.deps/Release/obj.target/saturnin/src/saturnin.o.d.raw   -c
Release/obj.target/saturnin/src/saturnin.o: ../src/saturnin.cc \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/node.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/cppgc/common.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8config.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-array-buffer.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-local-handle.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-internal.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-version.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8config.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-object.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-maybe.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-persistent-handle.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-weak-callback-info.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-primitive.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-data.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-value.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-traced-handle.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-container.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-context.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-snapshot.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-date.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-debug.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-script.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-message.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-exception.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-extension.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-external.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-function.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-function-callback.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-template.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-memory-span.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-initialization.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-callbacks.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-isolate.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-embedder-heap.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-microtask.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-statistics.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-promise.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-unwinder.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-embedder-state-scope.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-platform.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-json.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-locker.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-microtask-queue.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-primitive-object.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-proxy.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-regexp.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-typed-array.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-value-serializer.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/v8-wasm.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/node_version.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/node_api.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/js_native_api.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/js_native_api_types.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/node_api_types.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/node_buffer.h \
 /home/sneh/.cache/node-gyp/18.20.4/include/node/node.h \
 ../src/internal-saturnin.h ../src/internal-util.h
../src/saturnin.cc:
/home/sneh/.cache/node-gyp/18.20.4/include/node/node.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/cppgc/common.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8config.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-array-buffer.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-local-handle.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-internal.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-version.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8config.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-object.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-maybe.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-persistent-handle.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-weak-callback-info.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-primitive.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-data.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-value.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-traced-handle.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-container.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-context.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-snapshot.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-date.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-debug.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-script.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-message.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-exception.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-extension.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-external.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-function.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-function-callback.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-template.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-memory-span.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-initialization.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-callbacks.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-isolate.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-embedder-heap.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-microtask.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-statistics.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-promise.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-unwinder.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-embedder-state-scope.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-platform.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-json.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-locker.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-microtask-queue.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-primitive-object.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-proxy.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-regexp.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-typed-array.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-value-serializer.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/v8-wasm.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/node_version.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/node_api.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/js_native_api.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/js_native_api_types.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/node_api_types.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/node_buffer.h:
/home/sneh/.cache/node-gyp/18.20.4/include/node/node.h:
../src/internal-saturnin.h:
../src/internal-util.h:
