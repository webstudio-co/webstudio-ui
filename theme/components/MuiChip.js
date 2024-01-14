import typography from 'webstudio/theme/typography'
import palette from 'webstudio/theme/palette'

export default {
	styleOverrides: {
		root: {
			bgcolor: palette.background.hover,
			fontFamily: typography.body2.fontFamily,
		},
		deletable: {
			'&:focus': {},
		},
	},
}
