cmd_Release/saturnin.node := ln -f "Release/obj.target/saturnin.node" "Release/saturnin.node" 2>/dev/null || (rm -rf "Release/saturnin.node" && cp -af "Release/obj.target/saturnin.node" "Release/saturnin.node")