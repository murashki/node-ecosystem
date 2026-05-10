import type { Module } from '../@types/Module.ts';

export function checkMaintenanceModeContext<
  TModule extends Module = Module,
>(module: TModule): TModule {
  return ((context, ...args) => {
    if ( ! context.maintenanceMode) {
      throw new Error(`Feature available only in Maintenance Mode`);
    }
    return module(context, ...args);
  }) as TModule;
}
