import { Typography, Box, Avatar, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'

const Intro: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <section className={classes.section}>
        <div className="container">
          <div className="intro-section__holder">
            <div className="intro-section__visual-part">
              <div className="intro-section__slider-holder">
                <div
                  style={{ position: 'absolute', left: '-10%', top: '-25%' }}
                >
                  <div className="is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                  </div>
                  <Box className="is-primary">Ээж Аав</Box>
                </div>
                <Box style={{ position: 'absolute', left: '94%', top: '-20%' }}>
                  <Avatar sizes={'64'} alt="A" />
                  <Box className="is-warning">Babyzone</Box>
                </Box>
                <Box style={{ position: 'absolute', left: '97%', top: '57%' }}>
                  <Avatar sizes={'64'} alt="A" />
                  <Box className="is-info">Бизнес эрхлэгч</Box>
                </Box>
                <div className="default-bg">
                  <img src="/images/intro-section.svg" />
                </div>
                <div className="slider-wrapper"></div>
              </div>
            </div>
            <div className="intro-section__content-part">
              <Typography variant="h1" className="heading--with-divider">
                Өөрийн бизнес, бараа бүтээгдэхүүнийг сурталчлаарай
              </Typography>
              <Typography>
                Businesses everywhere are moving more quickly than ever before.
                Our creative platform allows your brand to evolve fast and tap
                into new digital strategies.
              </Typography>
              <div className="intro-form">
                <Box className={classes.field}>
                  <Box className={classes.control}>
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter Facebook page Url"
                    />
                  </Box>
                  <Box className={classes.control}>
                    <Button>Бүртгүүлэх</Button>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const useStyles = makeStyles({
  section: {
    padding: '3.5rem 0',
  },
  field: {},
  control: {},
})

export default Intro
