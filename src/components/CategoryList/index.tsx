import { WP_REST_API_Term } from 'wp-types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Avatar, Box, Typography } from '@mui/material'
import _ from 'lodash'
import { Colors } from '@theme/colors'

interface CategoryListProps {
  data: WP_REST_API_Term[]
  onPress?: (id: number) => void
  category?: number | undefined
  color?: 'dark' | 'light'
  width?: number | string
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
  width,
  color,
}) => {
  const acf: ACF_Term[] | undefined = data
  return (
    <>
      <List
        sx={{
          width: {
            lg: width,
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
                  color: (theme) =>
                    color === 'light'
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                  fontWeight: 600,
                },
                '&.Mui-selected': {
                  background: 'none',
                },
              }}
              secondaryAction={
                <Box
                  sx={{
                    fontSize: 12,
                    color: color === 'light' ? '#fff' : '#999',
                  }}
                >
                  {cat.count}
                </Box>
              }
            >
              <Box
                style={{
                  borderRadius: 36,
                  height: 36,
                  width: 36,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border:
                    category === cat.id
                      ? `1px solid ${Colors.primary}`
                      : '0 none',
                }}
              >
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt={cat.name}
                  src={_.get(cat, 'acf.image', '') as string}
                />
              </Box>
              <ListItemText
                sx={{
                  paddingLeft: '10px',
                  fontWeight: 500,
                  '& span': { color: color === 'light' ? '#fff' : '#000' },
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
        {category && color === 'dark' ? (
          <Box
            display="flex"
            width="100%"
            flexDirection={'row'}
            sx={{
              borderTop: '1px solid #eee',
              paddingTop: 2,
              paddingBottom: 2,
              marginTop: 1,
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70, marginRight: 2 }}
              src={
                _.get(_.find(data, { id: category }), 'acf.image', '') as string
              }
            />
            <Box>
              <Typography
                variant="h3"
                color={'#000'}
                sx={{ marginBottom: 0.5 }}
              >
                {_.get(_.find(data, { id: category }), 'name', '')}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: 12, paddingRight: 1 }}
                color={'#000'}
              >
                {_.get(_.find(data, { id: category }), 'description', '')}
              </Typography>
            </Box>
          </Box>
        ) : (
          ''
        )}
        <Typography
          component="li"
          align="center"
          sx={{ fontSize: 11, color: '#aaa' }}
          variant="body2"
        >
          © 2021 Babyzone.mn. Эх сурвалжийг дурдалгүй зураг нийтлэл түгээх нь
          хуулиар хориотой.
        </Typography>
      </List>
    </>
  )
}

export default CategoryList
