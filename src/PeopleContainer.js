import React from 'react';
import { Button, AppBar, Tabs, Tab, TextField, Paper, Typography } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
const useStyles = makeStyles(styles);

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}
const PeopleCards = ({people}) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(people[0].id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
	return (
		<Paper elevation={3} className={classes.peopleContainer}>
			<AppBar position="static" color="default">
				<Tabs value={value} centered onChange={handleChange}>
					{people.map(person => (
						<Tab
							key={person.id}
							value={person.id}
							label=	{person.title}
							centered
							wrapped
							{...a11yProps('one')}
						/>
					))}
				</Tabs>
			</AppBar>
			{people.filter((p) => p.id === value).map(person => (
				<div className={classes.peopleContent}>
					<Typography variant="subtitle1" gutterBottom>
						subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
					</Typography>
					<div className={classes.inputWrapper}>
					{person.questions.map((question, idx) => (
						<TextField
							key={`${person.id}-question-${idx}`}
							label={question}
							fullWidth
						/>
					))}
					</div>
				</div>
			))}
		</Paper>
	)

}
export default PeopleCards;
