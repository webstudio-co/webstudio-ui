import { alpha, lighten, darken, getContrastRatio } from '@mui/material'
import { SECONDARY_TEXT_ALPHA } from 'webstudio/constants'

export const buildTheme = (theme, bgcolor) => {
	const paper = lighten(bgcolor, 0.2)

  const contrast = getContrastRatio(bgcolor, '#000000')
	const primaryText = contrast > 4.5 ? '#000000' : '#FFFFFF'
  const secondaryText = alpha(primaryText, SECONDARY_TEXT_ALPHA) // 0.9
	const neutral = contrast > 4.5 ? '#EEEEEE' : '#222222'    
  const divider = contrast > 4.5 ? darken(bgcolor, 0.1) : lighten(bgcolor, 0.2)

	let newTheme = {
		...theme,
		palette: {
			...theme.palette,
			background: {
				default: bgcolor,
				main: bgcolor,
				paper: paper,
			},
			divider: divider,
			text: {
				primary: primaryText,
				secondary: secondaryText,
			},
			tertiary: {
				main: neutral,
			},
		},
	}
	return newTheme
}
