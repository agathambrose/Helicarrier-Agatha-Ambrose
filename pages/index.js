import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { WorkHistory } from "@mui/icons-material";
import moment from "moment";
import { Input } from "@mui/material";

import ListItemCard from "../src/components/ListItem";
import Filter from "../src/components/Filter";

const theme = createTheme();

const allModes = [
	{ value: 0, label: "All Modes" },
	{ value: "In-person", label: "In-person" },
	{ value: "Remote", label: "Remote" },
	{ value: "Hybrid", label: "Hybrid" },
];

const allJobTypes = [
	{ value: 0, label: "All job Types" },
	{ value: "Full Time", label: "Full Time" },
	{ value: "Part Time", label: "Part Time" },
	{ value: "Internship", label: "Internship" },
	{ value: "Contract", label: "Contract" },
];

const allJobExperiences = [
	{ value: 0, label: "All Job Experience" },
	{ value: "Entry level", label: "Entry level" },
	{ value: "Intermediate", label: "Intermediate" },
	{ value: "Senior", label: "Senior" },
];

export default function Album() {
	const [allData, setAllData] = useState([]);
	const [jobMode, setJobMode] = useState(0);
	const [jobType, setJobType] = useState(0);
	const [jobExperience, setJobExperience] = useState(0);
	const [jobStatus, setJobStatus] = useState(0);
	const [jobDate, setJobDate] = useState(0);
	const [jobData, setJobData] = useState([]);
	const [jobTitle, setJobTitle] = useState("");

	// function to handleChange for filter
	function handleChange(value, type) {
		if (type === "jobMode") {
			setJobMode(value);
		}
		if (type === "jobType") {
			setJobType(value);
		}
		if (type === "jobExperience") {
			setJobExperience(value);
		}
		if (type === "jobStatus") {
			setJobStatus(value);
		}
		if (type === "jobDate") {
			setJobDate(value);
		}
		if (type === "jobTitle") {
			setJobTitle(value);
		}
	}

	useEffect(() => {
		filterData();
	}, [jobMode, jobType, jobExperience, jobStatus, jobDate, jobTitle]);

	function filterData() {
		let filteredData = allData;

		// Filter data based on job mode, job type if not 0, job experience if not 0, job status if not 0, job date if not 0
		if (jobMode !== 0) {
			filteredData = filteredData.map((item) => {
				if (item.data.length > 0) {
					const filteredData2 = item.data.filter((job) => {
						return job.mode === jobMode;
					});
					return { ...item, data: filteredData2 };
				}
				return item;
			});
		}
		if (jobType !== 0) {
			filteredData = filteredData.map((item) => {
				if (item.data.length > 0) {
					const filteredJobType = item.data.filter((job) => {
						console.log("jobType", job.type === jobType);
						return job.type === jobType;
					});
					return { ...item, data: filteredJobType };
				}
				return item;
			});
		}
		if (jobExperience !== 0) {
			filteredData = filteredData.map((item) => {
				if (item.data.length > 0) {
					const filteredJobExperience = item.data.filter((job) => {
						return job.experience === jobExperience;
					});
					return { ...item, data: filteredJobExperience };
				}
				return item;
			});
		}
		if (jobStatus !== 0) {
			filteredData = filteredData.map((item) => {
				if (item.data.length > 0) {
					const filteredJobStatus = item.data.filter((job) => {
						return job.status === jobStatus;
					});
					return { ...item, data: filteredJobStatus };
				}
				return item;
			});
		}

		// Filter job title
		if (jobTitle !== "") {
			console.log(jobTitle);
			filteredData = filteredData.map((item) => {
				if (item.data.length > 0) {
					const filteredJobTitle = item.data.filter((job) => {
						return job.name.toLowerCase().includes(jobTitle.toLowerCase());
					});
					return { ...item, data: filteredJobTitle };
				}
				return item;
			});
		}

		// Filter job date if in range moment.js
		if (jobDate !== 0) {
			filteredData = filteredData.map((item) => {
				if (item.data.length > 0) {
					const filteredJobDate = item.data.filter((job) => {
						const today = moment();
						const date = moment(job.date, "DD/MM/YYYY");
						const date2 = moment(today, "DD/MM/YYYY");
						if (jobDate === "Past Month") {
							date2.subtract(1, "months");
						}
						if (jobDate === "Past 3 Months") {
							date2.subtract(3, "months");
						}
						if (jobDate === "Past 6 Months") {
							date2.subtract(6, "months");
						}
						if (jobDate === "Past Year") {
							date2.subtract(1, "years");
						}
						return date.isAfter(date2);
					});
					return { ...item, data: filteredJobDate };
				}
				return item;
			});
		}

		// Remove data if empty
		filteredData = filteredData.filter((item) => {
			return item.data.length > 0;
		});

		// Set the filtered data
		setJobData(filteredData);
	}

	// Make fetch call to get data via graphql
	useEffect(() => {
		fetch("http://localhost:3001", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: `
          query {
            allJobs {
              id
              name
              status
              type
              mode
              experience
              date
              description
            }
          }
        `,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.data.allJobs) {
					// group data into an array of objects by date and data to an array of jobs
					const groupedData = res.data.allJobs.reduce((acc, curr) => {
						const date = curr.date;
						if (!acc[date]) {
							acc[date] = {
								date,
								data: [curr],
							};
						} else {
							acc[date].data.push(curr);
						}
						return acc;
					}, {});
					// convert grouped data to an array of objects
					const data = Object.keys(groupedData).map((key) => {
						return {
							date: key,
							data: groupedData[key].data,
						};
					});
					setAllData(data);
					setJobData(data);
				}
			});
	}, []);

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
						bgcolor: "background.paper",
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
								<Input
									placeholder="Enter job title"
									fullWidth
									onChange={(e) => handleChange(e.target.value, "jobTitle")}
								/>
							</Grid>
						</Grid>
					</Container>
				</Box>
				<Grid
					container
					maxWidth="md"
					spacing={3}
					sx={{ marginLeft: "auto", marginRight: "auto", py: 4 }}
					alignItems="center"
				>
					<Grid item xs={3}>
						<Filter
							value={jobMode}
							onChange={(value) => handleChange(value, "jobMode")}
							options={allModes}
							label="Mode"
						/>
					</Grid>
					<Grid item xs={3}>
						<Filter
							value={jobType}
							onChange={(value) => handleChange(value, "jobType")}
							options={allJobTypes}
							label="Job Type"
						/>
					</Grid>
					<Grid item xs={3}>
						<Filter
							value={jobExperience}
							onChange={(value) => handleChange(value, "jobExperience")}
							options={allJobExperiences}
							label="Job Experience"
						/>
					</Grid>
					<Grid item xs={3}>
						<Filter
							value={jobStatus}
							onChange={(value) => handleChange(value, "jobStatus")}
							options={[
								{ value: 0, label: "All Status" },
								{ value: "Open", label: "Open" },
								{ value: "Closed", label: "Closed" },
							]}
							label="Job Status"
						/>
					</Grid>
					<Grid item xs={3}>
						<Filter
							value={jobDate}
							onChange={(value) => handleChange(value, "jobDate")}
							options={[
								{ value: 0, label: "Any Time" },
								{ value: "Past Month", label: "Past Month" },
								{ value: "Past 3 Months", label: "Past 3 Months" },
								{ value: "Past 6 Months", label: "Past 6 Months" },
								{ value: "Past Year", label: "Past Year" },
							]}
							label="Job Date"
						/>
					</Grid>
				</Grid>
				{/* Map all data */}
				{/* if jobData is empty */}
				{jobData.length === 0 ? (
					<Typography variant="h6" color="text.primary" align="center">
						No jobs found
					</Typography>
				) : (
					jobData.map((data, index) => {
						return (
							<Container sx={{ py: 4, textAlign: "center" }} maxWidth="lg">
								{/* End hero unit */}
								<h4 style={{ textAlign: "left" }}>{data.date}</h4>
								<Grid container spacing={4}>
									{data?.data?.map((item, index) => {
										return (
											<Grid key={item.id} item xs={12}>
												<ListItemCard data={item} />
											</Grid>
										);
									})}
								</Grid>
							</Container>
						);
					})
				)}
			</main>
			{/* Footer */}
			<Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
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
	);
}
