import React, {useState} from 'react';
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
import { makeStyles } from '@material-ui/core/styles';

import DocViewer from './DocViewer';
import config from './config';
import styles from './styles';
const useStyles = makeStyles(styles);

const loadingMsgs = [
	'Aquiring resources...',
	'Compiling data...',
	'Validating results...',
	'Generating report...'
]
const App = () => {
	const classes = useStyles();
	const [reportTypeText, setReportTypeText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMsg, setLoadingMsg] = useState('');

	const [activeStep, setActiveStep] = React.useState(0);
	const [reportType, setReportType] = React.useState(0);
	const [reportDate, setReportDate] = React.useState(new Date());
	const [productName, setProductName] = React.useState('');
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
	};
	const handleReportTypeChange = event => {
    setReportType(parseInt(event.target.value, 10));
  };
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
				<Container maxWidth="lg">
				<Stepper activeStep={activeStep} alternativeLabel>
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
					{isLoading &&
						<Paper elevation={3} className={classes.loading}>
							<CircularProgress color="secondary" />
							<Typography variant="body1" display="block" ></Typography>
						</Paper>
					}
				</Container>
			</div>
		</MuiPickersUtilsProvider>
  );
}

export default App;
