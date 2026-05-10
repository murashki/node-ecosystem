import type { EcosystemContext } from './EcosystemContext.ts';

export type MenuItem<
  TMenuItemCustomProps extends Record<string, any> = Record<never, any>,
> = TMenuItemCustomProps & Omit<{
  disabled?: boolean;
  key: string;
  label: string;
  module?: (context: EcosystemContext, ...args: any[]) => Promise<any>;
}, keyof TMenuItemCustomProps>;
