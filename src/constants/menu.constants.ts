import { WEB } from './uri.constants'

export interface MenuItemType {
  label: string
  route: string
  slug: string
  id: number | null
  seo?: {
    image: string
    content: string
  }
}

export const primarymenu: MenuItemType[] = [
  // {
  //   label: 'Бидний тухай',
  //   route: 'about',
  //   id: 1,
  //   slug: 'about',
  // },
  // {
  //   label: 'Хамтран ажиллах',
  //   route: 'partner',
  //   id: 2,
  //   slug: 'partner',
  // },
  {
    label: 'Холбоо Барих',
    route: 'contact',
    id: 3,
    slug: 'contact',
    seo: {
      image: `${WEB}/images/default.png`,
      content: 'Холбоо Барих',
    },
  },
  {
    label: 'Үйлчилгээний нөхцөл',
    route: '/page/terms',
    slug: 'terms',
    id: 4,
    seo: {
      image: `${WEB}/images/default.png`,
      content: 'Үйлчилгээний нөхцөл',
    },
  },
]
