import React, {useState} from 'react';
import { Container, AppBar, Typography, Toolbar, Button } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import PeopleContainer from  './PeopleContainer';
import DocViewer from './DocViewer';
import config from './config';
import styles from './styles';
const useStyles = makeStyles(styles);

const App = () => {
	const classes = useStyles();
	const [report, setReport] = useState(null)
	const [loadingReport, setLoadingReport] = useState(false);
	const handleGenerateReport = () => {
		setLoadingReport(true);
		setTimeout(() => {
			const doc = config.template.replace('{{engineer}}', '<strong>something from the engineer</strong>')
			setReport(doc);
			setLoadingReport(false);
		}, 2000);
	}

  return (
		<div className={classes.app}>
			<AppBar position="fixed" color="primary">
				<Toolbar>
					<div className={classes.title}>
						<Typography variant="h6" component="h1">AI In Project Management</Typography>
						<Typography variant="caption" display="block">version 0.0.1</Typography>
					</div>
					<Button
						variant="contained"
						color="secondary"
						className={classes.generate}
						onClick={handleGenerateReport}
					>
						Generate Report
					</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.offset}/>
			<Container maxWidth="lg">
				<PeopleContainer people={config.people} />
				<DocViewer template={report} onGenerateReport={handleGenerateReport} loading={loadingReport}/>
			</Container>
		</div>
  );
}

export default App;
