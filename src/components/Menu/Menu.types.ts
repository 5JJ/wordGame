interface MenuProps {
  selectedItem: string;
  menuList: Array<{ name: string; link: string }>;
}

export type MenuListProps = MenuProps & {
  isRendered: (check: boolean) => void;
};

export type MenuListItemProps = { isSelected: boolean };

export default MenuProps;
