import { EcosystemContext } from './EcosystemContext.ts';

export type Module<
  TData extends any = any,
  TModuleContext extends EcosystemContext = EcosystemContext,
> = {
  (context: TModuleContext, ...args: any[]): Promise<TData>;
};
