import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import reactJsx from 'vite-react-jsx'

export default defineConfig(({ command }) => ({
  plugins: [
    reactRefresh(),
    reactJsx(),
    compression({
      filter: /^/,
      disable: command === 'serve',
      threshold: 0,
      ext: '.gz',
      deleteOriginFile: true,
    }),
  ],
}))
