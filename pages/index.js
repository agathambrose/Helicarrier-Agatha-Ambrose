import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { WorkHistory } from '@mui/icons-material'
import {
  FormControl,
  Input,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material'

import ListItemCard from '../src/components/ListItem'
import Filter from '../src/components/Filter'

const theme = createTheme()
// job board
const allData = [
  {
    date: '01/01/2019',
    data: [
      {
        id: 1,
        name: 'Job 1',
        status: 'Open',
        type: 'Full Time',
        mode: 'Remote',
        experience: 'Entry level',
        date: '01/01/2019',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 2,
        name: 'Job 2',
        status: 'Closed',
        type: 'Part Time',
        mode: 'Hybrid',
        experience: 'Senior',
        date: '01/01/2019',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 3,
        name: 'Job 3',
        status: 'Open',
        type: 'Contract',
        mode: 'In-person',
        experience: 'Intermediate',
        date: '01/01/2019',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  },
  {
    date: '02/01/2019',
    data: [
      {
        id: 4,
        name: 'Job 4',
        status: 'Closed',
        type: 'Internship',
        mode: 'Remote',
        experience: 'Entry level',
        date: '01/01/2019',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 5,
        name: 'Job 5',
        status: 'Closed',
        type: 'Part Time',
        mode: 'Hybrid',
        experience: 'Intermediate',
        date: '01/01/2019',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 6,
        name: 'Job 6',
        status: 'Open',
        type: 'Contract',
        mode: 'In-person',
        experience: 'Senior',
        date: '01/01/2019',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  },
]

const allModes = [
  { value: 0, label: 'All Modes' },
  { value: 'In-person', label: 'In-person' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
]

const allJobTypes = [
  { value: 0, label: 'All job Types' },
  { value: 'Full Time', label: 'Full Time' },
  { value: 'Part Time', label: 'Part Time' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Contract', label: 'Contract' },
]

const allJobExperiences = [
  { value: 0, label: 'All Job Experience' },
  { value: 'Entry level', label: 'Entry level' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Senior', label: 'Senior' },
]

export default function Album() {
  const [jobMode, setJobMode] = useState(0)
  const [jobType, setJobType] = useState(0)
  const [jobExperience, setJobExperience] = useState(0)
  const [jobStatus, setJobStatus] = useState(0)
  const [jobDate, setJobDate] = useState(0)
  const [jobData, setJobData] = useState(allData)
  const [jobTitle, setJobTitle] = useState('')

  // function to handleChange for filter
  function handleChange(value, type) {
    if (type === 'jobMode') {
      setJobMode(value)
    }
    if (type === 'jobType') {
      setJobType(value)
    }
    if (type === 'jobExperience') {
      setJobExperience(value)
    }
    if (type === 'jobStatus') {
      setJobStatus(value)
    }
    if (type === 'jobDate') {
      setJobDate(value)
    }
    if (type === 'jobTitle') { 
      setJobTitle(value)
    }
  }

  useEffect(() => {
    filterData()
  }, [jobMode, jobType, jobExperience, jobStatus, jobDate, jobTitle])

  function filterData() {
    let filteredData = allData

    // Filter data based on job mode, job type if not 0, job experience if not 0, job status if not 0, job date if not 0
    if (jobMode !== 0) {
      filteredData = filteredData.map((item) => {
        if (item.data.length > 0) {
          const filteredData2 = item.data.filter((job) => {
            return job.mode === jobMode
          })
          return { ...item, data: filteredData2 }
        }
        return item
      })
    }
    if (jobType !== 0) {
      filteredData = filteredData.map((item) => {
        if (item.data.length > 0) {
          const filteredJobType = item.data.filter((job) => {
            console.log('jobType', job.type === jobType)
            return job.type === jobType
          })
          return { ...item, data: filteredJobType }
        }
        return item
      })
    }
    if (jobExperience !== 0) {
      filteredData = filteredData.map((item) => {
        if (item.data.length > 0) {
          const filteredJobExperience = item.data.filter((job) => {
            return job.experience === jobExperience
          })
          return { ...item, data: filteredJobExperience }
        }
        return item
      })
    }
    if (jobStatus !== 0) {
      filteredData = filteredData.map((item) => {
        if (item.data.length > 0) {
          const filteredJobStatus = item.data.filter((job) => {
            return job.status === jobStatus
          })
          return { ...item, data: filteredJobStatus }
        }
        return item
      })
    }

    // Filter job title
    if (jobTitle !== '') {
      console.log(jobTitle);
      filteredData = filteredData.map((item) => {
        if (item.data.length > 0) {
          const filteredJobTitle = item.data.filter((job) => {
            return job.name.toLowerCase().includes(jobTitle.toLowerCase())
          })
          return { ...item, data: filteredJobTitle }
        }
        return item
      })
    }

    // Remove data if empty
    filteredData = filteredData.filter((item) => {
      return item.data.length > 0
    }
    )

    // Set the filtered data
    setJobData(filteredData)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <WorkHistory sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Ambrose Jobboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Find your next job
            </Typography>

            <Grid container spacing={2} sx={{ pt: 4 }}>
              <Grid item xs={12}>
                <Input placeholder="Enter job title" fullWidth 
                onChange={(e) => handleChange(e.target.value, 'jobTitle')} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Grid
          container
          maxWidth="md"
          spacing={3}
          sx={{ marginLeft: 'auto', marginRight: 'auto', py: 4 }}
          alignItems="center"
        >
          <Grid item xs={3}>
            <Filter
              value={jobMode}
              onChange={(value) => handleChange(value, 'jobMode')}
              options={allModes}
              label="Mode"
            />
          </Grid>
          <Grid item xs={3}>
            <Filter
              value={jobType}
              onChange={(value) => handleChange(value, 'jobType')}
              options={allJobTypes}
              label="Job Type"
            />
          </Grid>
          <Grid item xs={3}>
            <Filter
              value={jobExperience}
              onChange={(value) => handleChange(value, 'jobExperience')}
              options={allJobExperiences}
              label="Job Experience"
            />
          </Grid>
          <Grid item xs={3}>
            <Filter
              value={jobStatus}
              onChange={(value) => handleChange(value, 'jobStatus')}
              options={[
                { value: 0, label: 'All Status' },
                { value: 'Open', label: 'Open' },
                { value: 'Closed', label: 'Closed' },
              ]}
              label="Job Status"
            />
          </Grid>
          <Grid item xs={3}>
            <Filter
              value={jobDate}
              onChange={(value) => handleChange(value, 'jobDate')}
              options={[
                { value: 0, label: 'Any Time' },
                { value: 1, label: 'Past Month' },
                { value: 2, label: 'Past 3 Months' },
                { value: 3, label: 'Past 6 Months' },
                { value: 4, label: 'Past Year' },
              ]}
              label="Job Date"
            />
          </Grid>
        </Grid>
        {/* Map all data */}
        {jobData.map((data, index) => {
          return (
            <Container sx={{ py: 4, textAlign: 'center' }} maxWidth="lg">
              {/* End hero unit */}
              <h4 style={{ textAlign: 'left' }}>{data.date}</h4>
              <Grid container spacing={4}>
                {data?.data?.map((item, index) => {
                  return (
                    <Grid key={item.id} item xs={12}>
                      <ListItemCard data={item} />
                    </Grid>
                  )
                })}
              </Grid>
            </Container>
          )
        })}
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Agatha Ambrose
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          © {new Date().getFullYear()}, Built with love by Agatha Ambrose
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}
