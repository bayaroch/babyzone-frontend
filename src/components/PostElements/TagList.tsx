import Box from '@mui/material/Box'
import { ChipProps, Chip, ListItem } from '@mui/material'
import Link from 'next/link'
import { Tag } from '@mui/icons-material'
import { WP_REST_API_Tags } from 'wp-types'

interface ChipExtendedProps extends ChipProps {
  data: WP_REST_API_Tags
}

const TagList: React.FC<ChipExtendedProps> = ({ data, ...rest }) => {
  return (
    <Box
      component="ul"
      display="flex"
      flexDirection={'row'}
      sx={{ padding: 0 }}
    >
      {data.map((tag) => (
        <ListItem
          key={tag.id}
          sx={{
            width: 'auto',
            '&:first-of-type': {
              paddingLeft: 0,
            },
            padding: 1,
          }}
        >
          <Link href={`/tag/${tag.id}?name=${tag.name}`}>
            <Chip
              icon={<Tag sx={{ fontSize: 12 }} />}
              label={tag.name}
              color="primary"
              variant="outlined"
              {...rest}
            />
          </Link>
        </ListItem>
      ))}
    </Box>
  )
}

export default TagList
