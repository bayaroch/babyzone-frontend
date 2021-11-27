import CategoryList from '@components/CategoryList'
import { Box, Drawer } from '@mui/material'
import useCategories from '@utils/hooks/useCategories'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import PrimaryMenu from '@containers/PrimaryMenu'

interface DrawerProps {
  toggleDrawer: (open: boolean) => void
  open: boolean
}

export const CustomDrawer: React.FC<DrawerProps> = ({ toggleDrawer, open }) => {
  const { cats } = useCategories()
  const router = useRouter()
  const [category, setCategory] = useState<number | undefined>()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (router.pathname === '/c/[id]') {
      setCategory(Number(router.query.id))
    } else {
      setCategory(undefined)
    }
  }, [router])

  const _onPress = (id: number) => {
    if (id) router.push(`/c/${id}`)
    toggleDrawer(false)
  }

  const onNavigate = (route: string) => {
    if (router) router.push(route)
  }

  return (
    <Drawer
      disableScrollLock
      ModalProps={{ BackdropProps: { invisible: true } }}
      PaperProps={{
        sx: {
          top: 0,
          backgroundColor: 'rgb(237, 77, 139, 0.7)',
          backdropFilter: 'blur(5px)',
          overflow: 'hidden',
          boxShadow: '-4px -1px 4px -4px rgba(0,0,0,0.24)',
        },
      }}
      anchor="right"
      className="ESDrawer"
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      <Box sx={{ width: 240, height: '100%', padding: 2 }}>
        {matches ? (
          <CategoryList
            color={'light'}
            width={'100%'}
            data={cats}
            onPress={_onPress}
            category={category}
          />
        ) : (
          ''
        )}

        <PrimaryMenu asPath={router.asPath} onPress={onNavigate} />
      </Box>
    </Drawer>
  )
}
