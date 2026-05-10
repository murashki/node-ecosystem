import type { MenuItem } from '../@types/MenuItem.ts';
import type { MenuOption } from '../@types/MenuOption.ts';

export function getCommonMenuOptions<
  TMenuItemCustomProps extends Record<string, any> = Record<never, any>
>(options: MenuItem<TMenuItemCustomProps>[]): MenuOption<TMenuItemCustomProps>[] {
  return options
    .filter((option) => ( ! option.disabled))
    .map((option) => ({ label: option.label, value: option }));
}
