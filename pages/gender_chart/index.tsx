/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import {
  Box,
  Button,
  Container,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import CategoryMenu from '@containers/CategoryMenu'
import genderTable from '@utils/gender/genderTable'
import useGenderForm, { GenderFormParams } from '@utils/gender/useGenderForm'
import { FieldValues } from 'react-hook-form'
import useJquery from '@utils/gender/useJquery'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Share } from '@components/PostElements'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { AGE_DATA, MONTH_DATA } from '@constants/gender.constants'

const Comment = dynamic(() =>
  import('@components/PostElements/FacebookComment')
)

const GenderChart: PageWithLayoutType = () => {
  // const [av, setAv] = useState<string>('01')
  const { open, setOpen, setData, isFemale } = useJquery()
  const router = useRouter()

  const { methods, Controller } = useGenderForm()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: GenderFormParams) => {
    if (data) setData(data)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainLayout>
      <Container
        maxWidth="lg"
        sx={{
          padding: {
            xs: '0',
            sm: '0',
          },
        }}
      >
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>
            <Typography align="center" variant="h3" component="div">
              Баяр хүргэе!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box textAlign={'center'} minWidth={200}>
              <img
                style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
                src={
                  isFemale ? 'images/girl_hiMom.png' : 'images/boy_hiMom.png'
                }
                alt="gender chart"
              />
              <Typography variant="body1" mb={1}>
                {isFemale ? 'Охинтой' : 'Хүүтэй'} боллоо!
              </Typography>
            </Box>

            <Share sx={{ margin: '0 auto', textAlign: 'center', width: 70 }} />
          </DialogContent>
        </Dialog>

        <Grid container columnSpacing={{ xs: 0 }}>
          <Grid item xs={12} md={8}>
            <Typography
              mb={3}
              variant="h1"
              align="center"
              sx={{
                padding: 1,
                fontSize: {
                  lg: 28,
                  md: 20,
                  sm: 18,
                  xs: 16,
                },
              }}
            >
              Хүйс тодорхойлогч зурхай
            </Typography>
            <Typography variant="body1" mb={1}>
              Бээжингээс олдсон 800 жилийн настай хааны булшнаас (монгол хааных
              байх магадлалтай) гарсан төрөх хүүхдийн хүйсийг тодорхойлдог
              энэхүү зурлага нь 90% таардаг гэлцдэг. Таных таарч байна уу?
            </Typography>
            <Box
              sx={{
                padding: {
                  xs: 1,
                  sm: 1,
                  md: 0,
                  lg: 0,
                },
              }}
            >
              <form id="gender-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 1, lg: 1 }}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Controller
                      name="av"
                      control={control}
                      render={({
                        field: { ref, onChange, value },
                      }: FieldValues) => (
                        <>
                          <Select
                            onChange={onChange}
                            required={true}
                            fullWidth={true}
                            labelId="age"
                            inputRef={ref}
                            sx={{
                              '& legend': {
                                display: 'none',
                              },
                              '& fieldset': {
                                top: 0,
                              },
                            }}
                            value={value}
                            variant="outlined"
                            label={<Typography color={'#111'}>Нас</Typography>}
                            size="small"
                            placeholder={'Нас'}
                            error={!!errors.av}
                          >
                            {AGE_DATA.map((item, index) => {
                              return (
                                <MenuItem value={item} key={index}>
                                  {item}
                                </MenuItem>
                              )
                            })}
                          </Select>
                          <Typography sx={{ mb: 2 }} variant="body2">
                            Хүүхэд олсон ээжийн нас
                          </Typography>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={5} item>
                    <Controller
                      name="mv"
                      control={control}
                      render={({ field: { onChange, value } }: FieldValues) => (
                        <>
                          <Select
                            onChange={onChange}
                            required={true}
                            fullWidth={true}
                            labelId="month"
                            value={value}
                            sx={{
                              '& legend': {
                                display: 'none',
                              },
                              '& fieldset': {
                                top: 0,
                              },
                            }}
                            label="Сар"
                            placeholder={'Сар'}
                            size="small"
                            error={!!errors.mv}
                          >
                            {MONTH_DATA.map((item, index) => {
                              return (
                                <MenuItem value={item} key={index}>
                                  {item}-р сар
                                </MenuItem>
                              )
                            })}
                          </Select>
                          <Typography sx={{ mb: 2 }} variant="body2">
                            Хүүхэд олсон сар
                          </Typography>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={2} item>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mb: 2, mt: '2px' }}
                      type="submit"
                    >
                      Үзэх
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
            {genderTable()}
            <Comment router={router} />
          </Grid>
          <Grid md={4} item>
            <CategoryMenu category={undefined} />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}

export default GenderChart
