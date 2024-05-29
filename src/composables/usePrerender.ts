type TUsePrerender = {
    staticDir: string;
    outputDir: string;
    indexPath: string;
    port: number;
    routes: string[];
    injectData?: { [x: string]: any };
};

export const usePrerender = ({
    staticDir,
    outputDir,
    indexPath,
    port = 8080,
    routes,
    injectData = {},
}: TUsePrerender) => {
    return {
        closeBundle: async () => {
            const fs: any = await importModule('fs');
            const path: any = await importModule('path');
            const Prerenderer: any = await importModule('@prerenderer/prerenderer');
            const PuppeteerRenderer: any = await importModule('@prerenderer/renderer-puppeteer');
            const prerenderer = new Prerenderer({
                staticDir,
                indexPath,
                server: {
                    port,
                },
                renderer: new PuppeteerRenderer({
                    injectProperty: '__PRERENDER_INJECTED',
                    inject: {
                        IS_PERRENDER: true,
                        ...injectData,
                    },
                    headless: false,
                    renderAfterDocumentEvent: 'prerender-event',
                    viewport: {
                        width: 1920,
                        height: 1080,
                    },
                }),
            });

            return prerenderer
                .initialize()
                .then(() => {
                    return prerenderer.renderRoutes(routes);
                })
                .then((renderedRoutes: any[]) => {
                    renderedRoutes.forEach((renderedRoute) => {
                        const renderedDir = path.join(outputDir, renderedRoute.originalRoute);
                        if (!fs.existsSync(renderedDir)) {
                            fs.mkdirSync(renderedDir, 777);
                        }
                        fs.writeFileSync(
                            path.join(renderedDir, 'index.html'),
                            renderedRoute.html.trim(),
                        );
                    });
                })
                .catch((error: Error) => {
                    throw error;
                })
                .finally(() => {
                    return prerenderer.destroy();
                });
        },
    };
};

function importModule(moduleName: string) {
    return new Promise((resolve, reject) => {
        import(moduleName).then((loadedModule) => resolve(loadedModule.default)).catch(reject);
    });
}
