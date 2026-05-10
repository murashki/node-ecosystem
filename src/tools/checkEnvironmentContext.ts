import type { Module } from '../@types/Module.ts';

export function checkEnvironmentContext<
  TModule extends Module = Module,
>(module: TModule): TModule {
  return ((context, ...args) => {
    if ( ! context.environment) {
      throw new Error(`No \`environment\` found in context`);
    }
    return module(context, ...args);
  }) as TModule;
}
