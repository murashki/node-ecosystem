import type { MenuItem } from './MenuItem.ts';

export type MenuOption<
  TMenuItemCustomProps extends Record<string, any> = Record<never, any>,
  TMenuItem extends MenuItem<TMenuItemCustomProps> = MenuItem<TMenuItemCustomProps>,
> = {
  label: string;
  value: TMenuItem;
}
