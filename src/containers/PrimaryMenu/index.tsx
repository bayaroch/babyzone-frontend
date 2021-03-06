import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { primarymenu, MenuItemType } from '@constants/menu.constants'

interface PrimaryMenuProps {
  onPress?: (path: string) => void
  asPath: string
}

const PrimaryMenu: React.FC<PrimaryMenuProps> = ({ onPress, asPath }) => {
  return (
    <List
      component="div"
      sx={{
        width: '100%',
      }}
    >
      {primarymenu &&
        primarymenu.map((item: MenuItemType, index) => (
          <ListItem
            component="div"
            key={index}
            selected={asPath === item.route}
            onClick={() => onPress && onPress(item.route)}
            disablePadding
            sx={{
              padding: '5px 0',
              cursor: 'pointer',
              '&:hover': {
                color: (theme) => theme.palette.primary.main,
              },
              '&.Mui-selected .MuiListItemText-root span': {
                color: (theme) => theme.palette.secondary.main,
                fontWeight: 600,
              },
              '&.Mui-selected': {
                background: 'none',
              },
            }}
          >
            <ListItemText
              sx={{
                paddingLeft: '10px',
                fontWeight: 500,
                '& span': { color: '#fff' },
                '&:hover': {
                  transition: 'translate 0.3s ease',
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 'medium',
                variant: 'body2',
              }}
            />
          </ListItem>
        ))}
    </List>
  )
}

export default PrimaryMenu
