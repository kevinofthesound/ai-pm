import React from 'react';
import { Paper, Button, Typography, CircularProgress } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
const useStyles = makeStyles(styles);

const DocViewer = ({template, onGenerateReport, loading}) => {
	const classes = useStyles();

	return (
		<Paper className={classes.doc}>
			{loading ?
				<div className={classes.emptyDoc}>
					<CircularProgress size={80} />
				</div>
			:
				<>
				{template ? 
					<Typography variant="body1" dangerouslySetInnerHTML={{__html: template}} />
				:
					<div className={classes.emptyDoc}>
						<div className={classes.emptyContent}>
							<Typography variant="h6">Nothing to report</Typography>
							<Typography variant="subtitle1" gutterBottom>Fill out the information above to generate a new report.</Typography>
							<Button
								variant="contained"
								color="secondary"
								className={classes.generate}
								onClick={onGenerateReport}
							>
								Generate Report
							</Button>
						</div>
					</div>
				}
				</>
			}
		</Paper>
	)
}

export default DocViewer;
