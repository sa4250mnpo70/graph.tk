


var shaders =  {"g-curve.fragment":"varying vec2  MCposition;\n\nfloat f(float x){\n\treturn sqrt(1.0-x*x);\n}\nuniform float thickness;\n\nfloat normalised(float x){\n\treturn (x);\n}\nfloat unnorm(float x){\n\treturn f(x)/normalised(x);\n}\n\nvoid main() {\n\tgl_FragColor=vec4(0,0,0,0.4);\n\tfloat x = MCposition.x;\n\tfloat lower = normalised(x)* unnorm(x);\n\tif(MCposition.y > lower){\n\t\tgl_FragColor=vec4(1,0,0,0.2);\n\t\tfloat dy=0.1;\n\t\tfloat upper = unnorm(x)*(normalised(x)+ thickness*(x)*((x)));\n\t\tif(MCposition.y<upper){\n\t\t\tgl_FragColor=vec4(1,0,0,1.0);\n\t\t}\n\n\t\t\n\t}\n\n}\n","g-curve.vertex":"\nvarying vec2  MCposition;\n\nvoid main()\n{\n\n\tvec3 ecPosition = vec3(gl_ModelViewMatrix * gl_Vertex);\n\tvec3 tnorm      = normalize(gl_NormalMatrix * gl_Normal);\n\n\tMCposition  = gl_Vertex.xy;\n\tgl_Position = gl_ProjectionMatrix*gl_ModelViewMatrix * gl_Vertex;\n}\n","g-region-xy.fragment":"#ifdef GL_ES\nprecision highp float;\n#endif\n\n#import javascript\n\nvarying vec2  MCposition;\nuniform vec4 uColor;\n\nvoid main() {\n    float dx=0.02;\n    float dy=0.02;\n\tif(f(MCposition.x,MCposition.y)){\n        vec3 white = vec3(1.0,1.0,1.0);\n        gl_FragColor=vec4(uColor.rgb*uColor.a + white*(1.0-uColor.a),0.97);\n    }else if(\n        f(MCposition.x+dx,MCposition.y) ||\n        f(MCposition.x-dx,MCposition.y) ||\n        f(MCposition.x,MCposition.y+dx) ||\n        f(MCposition.x,MCposition.y-dx)\n    ){\n        gl_FragColor=vec4(uColor.rgb,1.0);\n\t}else{\n\t\tdiscard;\n\t}\n\n}\n","g-region-xy.vertex":"\nattribute vec2 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat3 uNMatrix;\n\nvarying vec2  MCposition;\n\nvoid main()\n{\n\tvec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 0.0, 1.0);\n\tgl_Position = uPMatrix * mvPosition;\n\n\tMCposition  = aVertexPosition;\n}\n","g-surface.fragment":"#ifdef GL_ES\nprecision highp float;\n#endif\n/*\nuniform vec4 uColor;\nvoid main(void) {\n\tgl_FragColor = uColor;\n}\n*/\n\nvarying vec2  MCposition;\nvarying float diffuse;\nvarying float specular;\nuniform vec4 uColor;\nconst float ambient = 0.03;\nfloat rand(vec2 co){\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main(void) {\n\tvec2 pos = fract(MCposition);\n\tif ((pos.x > 0.50)&&(pos.y > 0.5) || (pos.x < 0.5)&&(pos.y < 0.5)){\n\t\tfloat lightWeighting = (0.2*diffuse+0.8*specular+ambient);\n\t\tgl_FragColor = vec4(lightWeighting*uColor.rgb, uColor.a);\n\t}else{\n\t\tvec3 othercolor = vec3(1,1,1)-uColor.rgb;\n\t\tothercolor=othercolor*0.1+uColor.rgb*0.9;\n\t\t\n\t\tfloat lightWeighting = (1.0-0.1*rand(MCposition))*(0.7*diffuse+0.3*specular+ambient);\n\t\tgl_FragColor = vec4(lightWeighting*othercolor.rgb, uColor.a);\n\t\t\n\t}\n}\n","g-surface.vertex":"\n#ifdef GL_ES\nprecision highp float;\n#endif\n/*\nattribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvoid main(void) {\n\tvec3 donothing = aVertexNormal;\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}\n*/\n\nattribute vec2 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute float aHeight;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat3 uNMatrix;\n\nuniform vec3 uPointLightingLocation;\n\nvarying vec2 MCposition;\nvarying float diffuse;\nvarying float specular;\n\n\nvoid main(void){\n\tvec3 uPointLightingColor = vec3(1.0,1.0,1.0);\n\tvec4 mvPosition = uMVMatrix * vec4(aVertexPosition, aHeight, 1.0);\n\tgl_Position = uPMatrix * mvPosition;\n\tvec3 lightLocation = vec3(uMVMatrix * vec4(uPointLightingLocation,1.0));\n\tvec3 lightDirection = normalize(lightLocation - mvPosition.xyz); // Note: the ray is traced backwards\n\t\n\tvec3 transformedNormal = normalize(uNMatrix * normalize(aVertexNormal));\n\t\n\tdiffuse = max((dot(transformedNormal, lightDirection)), 0.0);\n\tfloat spec = 0.0;\n\tvec3 reflectVec = reflect(-lightDirection, transformedNormal);\n\t\n\tvec3 viewVec = normalize(-vec3(mvPosition));\n\tif (diffuse > 0.0) {\n\t\tspec = max(dot(reflectVec, viewVec), 0.0);\n\t\tspec = pow(spec, 16.0);\n\t}\n\tspecular = spec;\n\tMCposition  = aVertexPosition.xy;\n}","region2.fragment":"#ifdef GL_ES\nprecision highp float;\n#endif\n\n#import javascript\n\nvarying vec2  MCposition;\nuniform vec4 uColor;\n\nvoid main() {\n    float dx=0.02;\n    float dy=0.02;\n\tif(f(MCposition.x,MCposition.y)){\n        vec3 white = vec3(1.0,1.0,1.0);\n        gl_FragColor=vec4(uColor.rgb*uColor.a + white*(1.0-uColor.a),0.97);\n    }else if(\n        f(MCposition.x+dx,MCposition.y) ||\n        f(MCposition.x-dx,MCposition.y) ||\n        f(MCposition.x,MCposition.y+dx) ||\n        f(MCposition.x,MCposition.y-dx)\n    ){\n        gl_FragColor=vec4(uColor.rgb,1.0);\n\t}else{\n\t\tdiscard;\n\t}\n\n}\n","region2.vertex":"attribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uSMatrix;\n\nvarying vec2  MCposition;\n\nvoid main()\n{\n\tvec4 sPosition = uSMatrix * vec4(aVertexPosition, 1.0);\n\tMCposition  = sPosition.xy;\n\tvec4 mvPosition = uMVMatrix * sPosition;\n\tgl_Position = uPMatrix * mvPosition;\n\n\t\n}\n","scalar2.fragment":"#ifdef GL_ES\nprecision highp float;\n#endif\n\n#import javascript\n\nvarying vec2  MCposition;\nuniform vec4 uColor;\n\nvoid main() {\n    float dx=0.02;\n    float dy=0.02;\n    float v = f(MCposition.x,MCposition.y);\n    \n    gl_FragColor=vec4(uColor.rgb,uColor.a*v);\n\n}\n","scalar2.vertex":"attribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uSMatrix;\n\nvarying vec2  MCposition;\n\nvoid main()\n{\n\tvec4 sPosition = uSMatrix * vec4(aVertexPosition, 1.0);\n\tMCposition  = sPosition.xy;\n\tvec4 mvPosition = uMVMatrix * sPosition;\n\tgl_Position = uPMatrix * mvPosition;\n\n\t\n}\n","shader-fs.fragment":"#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform vec4 uColor;\nvoid main(void) {\n\tgl_FragColor = uColor;\n}\n","shader-vs.vertex":"attribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvoid main(void) {\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}\n"} ;


