export default (theme) => ({
	app: {
		padding: '20px'
	},
	title: {
		flex: 1
	},
	offset: theme.mixins.toolbar,
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		padding: '20px'
	},
	buttonWrapper: {
		marginTop: '20px'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	datepicker: {
		display: 'block'
	},
	peopleContent: {
		display: 'flex',
		padding: '20px',
		flexDirection: 'column',
		height: '350px',
		overflow: 'auto'
	},
	inputWrapper: {
		display: 'flex',
		flexDirection: 'column',
		'& .MuiTextField-root': {
      margin: theme.spacing(1),
    }
	},
	doc: {
		minHeight: '400px',
		marginTop: theme.spacing(3),
		padding: '30px'
	},
	emptyDoc: {
		minHeight: 'inherit',
		display: 'flex',
		alignItems: 'center',
  	justifyContent: 'center'
	},
	emptyContent: {
		textAlign: 'center'
	}
})
