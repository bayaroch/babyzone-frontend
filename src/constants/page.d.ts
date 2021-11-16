import { NextPage } from 'next'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import LoginLayout from '@/layouts/LoginLayout'

type PageWithMainLayoutType = NextPage & { Layout?: typeof MainLayout }

// type PageWithPlainLayoutType = NextPage & { Layout?: typeof PlainLayout }

type PageWithAuthLayoutType = NextPage & {
  Layout?: typeof LoginLayout
}

type PageWithAdminLayoutType = NextPage & {
  Layout?: typeof AdminLayout
}

type PageWithLayoutType =
  | PageWithMainLayoutType
  | PageWithAdminLayoutType
  | PageWithAuthLayoutType

export default PageWithLayoutType
