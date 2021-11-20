import { WP_REST_API_Term } from 'wp-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Avatar } from '@mui/material'
import _ from 'lodash'
import { Theme } from '@mui/material/styles'
import useClasses from '@utils/hooks/useClasses'

interface CategoryListProps {
  data: WP_REST_API_Term[]
  onPress?: (id: number) => void
}

interface ACF_Term extends WP_REST_API_Term {
  acf?: {
    image: string | undefined
  }
}

const styles = (theme: Theme) => ({
  item: {
    padding: '5px 0',
    cursor: 'pointer',
    '&:hover': {},
  },
  name: {
    paddingLeft: 10,
    fontWeight: 500,
    '&:hover': {
      transition: 'translate 0.3s ease',
      color: theme.palette.primary.main,
    },
  },
})

const CategoryList: React.FC<CategoryListProps> = ({ data, onPress }) => {
  const classes = useClasses(styles)
  const acf: ACF_Term[] | undefined = data
  return (
    <List>
      {acf &&
        acf.map((cat) => (
          <ListItem
            key={cat.id}
            onClick={() => onPress && onPress(cat.id)}
            component="div"
            disablePadding
            className={classes.item}
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt={cat.name}
              src={_.get(cat, 'acf.image', '') as string}
            />
            <ListItemText
              className={classes.name}
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
