import React from 'react'
import { Paper, Box, Container, Typography } from '@mui/material'
import { SquareLogo } from 'webstudio/components'

type AuthScreenProps = {
	title: string
	subtitle?: string
	logo?: string
	children: React.ReactNode
}

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
	const { title, subtitle, children, logo } = props
	return (
		<Box sx={sx.root}>
			<Container maxWidth="sm">
				<Paper elevation={0} sx={sx.paper}>
					<Box sx={sx.logo}>
						<SquareLogo src={logo} />
					</Box>
					<Box sx={sx.titles}>
						<Typography variant="h4" sx={sx.title}>
							{title}
						</Typography>
						{subtitle && (
							<Typography variant="body1" sx={sx.subtitle}>
								{subtitle}
							</Typography>
						)}
					</Box>
					{children}
				</Paper>
			</Container>
		</Box>
	)
}

export default AuthScreen

const sx = {
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		bgcolor: 'background.default',
		height: '100%',
	},
	titles: {
		mb: 1,
	},
	logo: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		pb: 2,
	},
	title: {
		textAlign: 'center',
	},
	subtitle: {
		textAlign: 'center',
		color: 'text.primary',
	},
	paper: {
		p: {
			sm: 4,
			xs: 2,
		},
		border: '1px solid',
		borderColor: 'divider',
		borderRadius: (theme) => `${theme.shape.borderRadius}px`,
		bgcolor: 'background.paper',
	},
}
