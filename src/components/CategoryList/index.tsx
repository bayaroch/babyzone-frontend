import { WP_REST_API_Term } from 'wp-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Avatar, Box } from '@mui/material'
import _ from 'lodash'

interface CategoryListProps {
  data: WP_REST_API_Term[]
  onPress?: (id: number) => void
  category?: number | undefined
}

interface ACF_Term extends WP_REST_API_Term {
  acf?: {
    image: string | undefined
  }
}

const CategoryList: React.FC<CategoryListProps> = ({
  data,
  onPress,
  category,
}) => {
  const acf: ACF_Term[] | undefined = data
  return (
    <List
      sx={{
        width: {
          lg: 280,
          md: 200,
        },
      }}
    >
      {acf &&
        acf.map((cat) => (
          <ListItem
            key={cat.id}
            selected={category === cat.id ? true : false}
            onClick={() => onPress && onPress(cat.id)}
            component="div"
            disablePadding
            sx={{
              padding: '5px 0',
              cursor: 'pointer',
              '&:hover': {
                color: (theme) => theme.palette.primary.main,
              },
              '&.Mui-selected .MuiListItemText-root span': {
                color: (theme) => theme.palette.primary.main,
                fontWeight: 600,
              },
              '&.Mui-selected': {
                background: 'none',
              },
            }}
            secondaryAction={
              <Box sx={{ fontSize: 12, color: '#999' }}>{cat.count}</Box>
            }
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt={cat.name}
              src={_.get(cat, 'acf.image', '') as string}
            />
            <ListItemText
              sx={{
                paddingLeft: '10px',
                fontWeight: 500,
                '& span': { color: '#000' },
                '&:hover': {
                  transition: 'translate 0.3s ease',
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              primary={cat.name}
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

export default CategoryList
