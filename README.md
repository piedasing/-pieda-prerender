# @pieda/prerender

```bash
npm install @pieda/prerender
```

vite.config.js

```js
import { usePrerender } from '@pieda/prerender';

export default (({mode}) => {
    const env = loadEnv(mode, process.cwd());
    const publicPath = env.VITE_PUBLIC_PATH || '/';

    return {
        env,
        base: publicPath,
        ...<其他設定>,
        plugins: [
            usePrerender({
                staticDir: path.join(__dirname, 'dist', mode),
                outputDir: path.join(__dirname, 'dist', mode, publicPath),
                indexPath: path.join(__dirname, 'dist', mode, publicPath, 'index.html'), // prettier-ignore
                port: 8080,
                routes: ['/'],
            }),
        ]
    };
})
```
