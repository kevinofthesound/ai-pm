export default (theme) => ({
	app: {
		padding: '20px'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	stepper: {
		width: '100%'
	},
	title: {
		flex: 1
	},
	progress: {
		marginBottom: '10px'
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
	backButton: {
		marginRight: '10px'
	},
	loading: {
		width: '200px',
		padding: '40px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
})
