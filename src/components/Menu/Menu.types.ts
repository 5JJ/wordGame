interface MenuProps {
  selectedItem: string;
  menuList: Array<{ name: string; link: string }>;
}

export type MenuListProps = MenuProps & {
  callbackAfterRendering: (check: boolean) => void;
  closeList: () => void;
};

export type MenuListItemProps = { isSelected: boolean };

export default MenuProps;
