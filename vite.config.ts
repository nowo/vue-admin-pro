import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import VueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

const alias: Record<string, string> = {
    '@': resolve(__dirname, 'src'), // 配置src的别名
}

const viteConfig = defineConfig((mode: ConfigEnv) => {
    const env = loadEnv(mode.mode, process.cwd())
    return {
        plugins: [
            vue(),
            // https://github.com/antfu/unplugin-auto-import
            AutoImport({
                imports: [
                    'vue',
                    'vue-router',
                    // '@vueuse/head',
                    '@vueuse/core',
                ],
                dts: 'src/types/auto-imports.d.ts',
                dirs: [
                    'src/composables',
                    'src/stores',
                ],
                vueTemplate: true,
                resolvers: [ElementPlusResolver()],
            }),

            // https://github.com/antfu/unplugin-vue-components
            Components({
                // allow auto load markdown components under `./src/components/`
                extensions: ['vue', 'md'],
                // allow auto import and register components used in markdown
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                dts: 'src/types/components.d.ts',
                resolvers: [ElementPlusResolver()],
            }),

            // https://github.com/antfu/unocss
            // see uno.config.ts for config
            Unocss(),

            // https://github.com/webfansplz/vite-plugin-vue-devtools
            VueDevTools(),

            // vueSetupExtend(),
            viteCompression(),
            // JSON.parse(env.VITE_OPEN_CDN) ? buildConfig.cdn() : null,
            // 打包体积分析
            visualizer({
                open: true,
            }),
        ],
        root: process.cwd(),
        resolve: { alias },

        base: env.VITE_PUBLIC_PATH || '/', // 项目部署在主域名的子文件使用,例如http://localhost:3000/myvite/。不填默认就是/

        server: {

            host: '0.0.0.0',
            // port: env.VITE_PORT as unknown as number,   // 开发启动的端口
            // open: JSON.parse(env.VITE_OPEN),    // 是否自动打开浏览器
            hmr: true,
            proxy: {
                '/api': {
                    // target: "http://192.168.0.200:9091/api",
                    target: env.VITE_API_URL,
                    ws: true,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                },
            },

        },
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender'
                        }
                    },
                },
            },
            minify: 'terser',
            terserOptions: {
                compress: {
                    // 生产环境时移除console
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
        css: { preprocessorOptions: { css: { charset: false } } },
        define: {
            __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
            __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
        },
    }
})

export default viteConfig
