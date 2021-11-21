export interface MenuItemType {
  label: string
  route: string
  id: number | null
}

export const primarymenu: MenuItemType[] = [
  {
    label: 'Бидний тухай',
    route: '/about',
    id: null,
  },
  {
    label: 'Хамтран ажиллах',
    route: '/partner',
    id: null,
  },
  {
    label: 'Холбоо Барих',
    route: '/partner',
    id: null,
  },
]
