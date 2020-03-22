import React, {useState, useEffect} from 'react';
import { Container, AppBar, Typography, Toolbar, Button, TextField, Paper, Box, CircularProgress } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Editor } from '@tinymce/tinymce-react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import {DateTime} from 'luxon';
import config from './config';
import styles from './styles';
import drimg from './dr.png';
const useStyles = makeStyles(styles);

const loadingMsgs = [
	'Acquiring resources...',
	'Compiling data...',
	'Validating results...',
	'Generating report...'
];
let loadingIndex = 0;
let intervalId = null;
const App = () => {
	const classes = useStyles();
	const [loadingMsg, setLoadingMsg] = useState(loadingMsgs[0]);
	const [isLoading, setIsLoading] = useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	const [reportType, setReportType] = React.useState(0);
	const [reportDate, setReportDate] = React.useState(new Date());
	const [productName, setProductName] = React.useState('');

	useEffect(() => {
		if(activeStep === 2) {
			intervalId = setInterval(() => {
				if(loadingIndex < loadingMsgs.length){
				setLoadingMsg(loadingMsgs[loadingIndex]);
				loadingIndex++;
				} else {
					setIsLoading(false);
					loadingIndex = 0;
					setLoadingMsg(loadingMsgs[0])
					clearInterval(intervalId);
				}
			}, 1500)
		}
	}, [activeStep])
  const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
		if(activeStep === 1) {
			setIsLoading(true);
		}
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
	};
	const handleReportTypeChange = event => {
    setReportType(parseInt(event.target.value, 10));
	};
	const getReport = () => {
		return config[reportType].report.replace('&lt;Insert Type&gt;', config[reportType].title)
		.replace('&lt;Insert the type of Scope&gt;', config[reportType].title)
		.replace('&lt;insert name of product&gt;', productName)
		.replace('&lt;Insert Date&gt;', DateTime.fromJSDate(reportDate).toFormat('DDD'))

	}
  return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div className={classes.app}>
				<AppBar position="fixed" color="primary">
					<Toolbar>
						<div className={classes.title}>
							<Typography variant="h6" component="h1">AI In Project Management</Typography>
							<Typography variant="caption" display="block">version 0.0.1</Typography>
						</div>
					</Toolbar>
				</AppBar>
				<div className={classes.offset}/>
				<Container maxWidth="lg" className={classes.container}>
					<Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
						<Step>
							<StepLabel>Select report type</StepLabel>
						</Step>
						<Step>
							<StepLabel>Enter details</StepLabel>
						</Step>
						<Step>
							<StepLabel>Review report</StepLabel>
						</Step>
					</Stepper>

				{isLoading ?
					<Paper elevation={3} className={classes.loading}>
						<CircularProgress color="secondary" className={classes.progress}/>
						<Typography variant="h6" display="block">{loadingMsg}</Typography>
					</Paper>
				:
					<Fade in={!isLoading} timeout={1500}>
					<Paper elevation={3} className={classes.inputContainer}>
						{activeStep === 0 && 
							<FormControl component="fieldset">
								<FormLabel component="legend">Please choose one of the following reports</FormLabel>
								<RadioGroup aria-label="report type" name="report" value={reportType} onChange={handleReportTypeChange}>
									<FormControlLabel value={0} control={<Radio />} label="Procuring Existing Product & Spares" />
									<FormControlLabel value={1} control={<Radio />} label="Developing / Engineering Item" />
									<FormControlLabel value={2} control={<Radio />} label="Providing Services (Imbedded in Program Office)" />
								</RadioGroup>
							</FormControl>
						}
						{activeStep === 1 && 
							<Box className={classes.details}>
								<KeyboardDatePicker
									disableToolbar
									className={classes.datepicker}
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									id="date-picker-inline"
									label="Date of report"
									value={reportDate}
									onChange={(date) => { setReportDate(date); }}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
								<TextField label="Name of product" onChange={(e)=> {setProductName(e.target.value);}}/>
							</Box>
						}
						{activeStep === 2 &&
							<Box>
								<Editor
									initialValue={getReport()}
									disabled
									inline
								/>
								<img src={drimg} alt="Deliverables and Reports" />
							</Box>
						}
						<Box className={classes.buttonWrapper}>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}
							>
								Back
							</Button>
							{activeStep < 2  &&
								<Button variant="contained" color="primary" onClick={handleNext}>
									{activeStep === 1 ? 'Generate Report' : 'Next'}
								</Button>
							}
						</Box>
					
					</Paper>
				</Fade>
				}
				</Container>
			</div>
		</MuiPickersUtilsProvider>
  );
}

export default App;
