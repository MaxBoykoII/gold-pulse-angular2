import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: './client-aot/app/main.js',
  dest: './public-prod/dist/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
   external: ['lodash', 'd3'],
  paths: {
    lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.2/lodash.min.js',
    d3: 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js'
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: './client-aot/node_modules/rxjs/**',
      }),
      uglify()
  ]
}
