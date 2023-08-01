import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Contrechamps`}
      />
      {/* PLYR CSS */}
      <link rel="stylesheet" href="https://cdn.plyr.io/3.7.2/plyr.css" />

      {/* WTCGL SCRIPT */}
      <script src="/wtc-gl.js" />
      
      <script id="vertexShaderLight" type="x-shader/x-vertex" dangerouslySetInnerHTML={{__html: `
        attribute vec4 a_position;

        uniform mat4 u_modelViewMatrix;
        uniform mat4 u_projectionMatrix;

        void main() {
        gl_Position = a_position;
        }`
        }}/>

      <script id="fragmentShaderLight" type="x-shader/x-fragment" dangerouslySetInnerHTML={{__html: `
        precision highp float;

        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform sampler2D u_noise;
        uniform sampler2D u_buffer;
        uniform bool u_bufferpass;


        #define PI 3.141592653589793
        #define TAU 6.283185307179586

        vec2 getScreenSpace() {
        vec2 uv = (gl_FragCoord.xy) / min(u_resolution.y, u_resolution.x);

        return uv;
        }

        #define pow2(x) (x * x)

        const int samples = 2;
        const float sigma = float(samples) * 0.25;

        float gaussian(vec2 i) {
        return 1.0 / (2.0 * PI * pow2(sigma)) * exp(-((pow2(i.x) + pow2(i.y)) / (2.0 * pow2(sigma))));
        }

        vec3 blur(sampler2D sp, vec2 uv, vec2 scale) {
        vec3 col = vec3(0.0);
        float accum = 0.0;
        float weight;
        vec2 offset;

        for (int x = -samples / 2; x < samples / 2; ++x) {
          for (int y = -samples / 2; y < samples / 2; ++y) {
              offset = vec2(x, y);
              weight = gaussian(offset);
              col += texture2D(sp, uv + scale * offset).rgb * weight;
              accum += weight;
          }
        }

        return col / accum;
        }

        const float blurStrength = 2.;
        const float blurMultiplier = 0.998;

        void main() {
        vec2 uv = getScreenSpace();
        vec2 sample = gl_FragCoord.xy / u_resolution;

        //Normal
        // vec3 colour = vec3(sin(uv.x)*.5+.5, sin(uv.y)*.5+.5, 1.);
        vec3 colour = vec3(1, 0.860, 0.939);

        //Green and Dark
        //vec3 colour = vec3(sin(uv.x)*.1 + 0.573, sin(uv.y)*.1 + 0.867, 0.553);
        // vec3 colour = vec3(0.204, sin(uv.y)*.01 + 0.204,0.204);

        float s = texture2D(u_buffer, sample).r;

        vec2 ps = vec2(1.0) / u_resolution.xy;

        if(u_bufferpass) {
        s = (blur(u_buffer, sample + vec2(.001), ps*blurStrength) * blurMultiplier).r;

        float c = s * .999 + smoothstep(length(ps)*20., .0, length(uv - u_mouse)*.5) * .5;
        colour = vec3(c);
        } else {
        colour = mix(vec3(0.6), colour, sin(s)*.5+.1);
        colour *= colour*2.;
        }

        gl_FragColor = vec4(colour, 1);

      }`
      }} />

      <script id="vertexShaderDark" type="x-shader/x-vertex" dangerouslySetInnerHTML={{__html: `
        attribute vec4 a_position;

        uniform mat4 u_modelViewMatrix;
        uniform mat4 u_projectionMatrix;

        void main() {
          gl_Position = a_position;
        }`
        }} />

        <script id="fragmentShaderDark" type="x-shader/x-fragment" dangerouslySetInnerHTML={{__html: `
          precision highp float;

          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          uniform float u_time;
          uniform sampler2D u_noise;
          uniform sampler2D u_buffer;
          uniform bool u_bufferpass;


          #define PI 3.141592653589793
          #define TAU 6.283185307179586

          vec2 getScreenSpace() {
            vec2 uv = (gl_FragCoord.xy) / min(u_resolution.y, u_resolution.x);
            
            return uv;
          }

          #define pow2(x) (x * x)

          const int samples = 2;
          const float sigma = float(samples) * 0.25;

          float gaussian(vec2 i) {
              return 1.0 / (2.0 * PI * pow2(sigma)) * exp(-((pow2(i.x) + pow2(i.y)) / (2.0 * pow2(sigma))));
          }

          vec3 blur(sampler2D sp, vec2 uv, vec2 scale) {
              vec3 col = vec3(0.0);
              float accum = 0.0;
              float weight;
              vec2 offset;

              for (int x = -samples / 2; x < samples / 2; ++x) {
                  for (int y = -samples / 2; y < samples / 2; ++y) {
                      offset = vec2(x, y);
                      weight = gaussian(offset);
                      col += texture2D(sp, uv + scale * offset).rgb * weight;
                      accum += weight;
                  }
              }

              return col / accum;
          }

          const float blurStrength = 2.;
          const float blurMultiplier = 0.998;

          void main() {
            vec2 uv = getScreenSpace();
            vec2 sample = gl_FragCoord.xy / u_resolution;
            
            //Normal
            //vec3 colour = vec3(sin(uv.x)*.5+.5, sin(uv.y)*.5+.5, 1.);

            //Green and Dark
            vec3 colour = vec3(sin(uv.x)*.1 + 0.573, sin(uv.y)*.1 + 0.867, 0.553);
            // vec3 colour = vec3(0.204, sin(uv.y)*.01 + 0.204,0.204);

            float s = texture2D(u_buffer, sample).r;
            
            vec2 ps = vec2(1.0) / u_resolution.xy;
            
            if(u_bufferpass) {
              s = (blur(u_buffer, sample + vec2(.001), ps*blurStrength) * blurMultiplier).r;
              
              float c = s * .999 + smoothstep(length(ps)*20., .0, length(uv - u_mouse)*.5) * .5;
              colour = vec3(c);
            } else {
              colour = mix(vec3(0.2), colour, sin(s)*.5);
              // colour *= colour*2.;
            }

            gl_FragColor = vec4(colour, 1);

          }`
        }} />      

        <script src='https://cdn.jsdelivr.net/gh/SeanFree/Vector2@master/Vector2.min.js' />
        <script src='https://cdn.jsdelivr.net/gh/josephg/noisejs@master/perlin.js' />
      
      <meta property="og:image" content={HOME_OG_IMAGE_URL} key="ogImage" />
    </Head>
  )
}
