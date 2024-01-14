import React from 'react'
import { Icon } from 'webstudio/components'
import { Stack, Box, Typography } from '@mui/material'

type CartTextProps = {
	label: string
	value: string
  icon?: string
}

const CartText: React.FC<CartTextProps> = (props) => {
	const { label, value, icon } = props

	return (
		<Box sx={sx.root}>
			<Typography variant="body1" sx={sx.label}>
				{label}
			</Typography>
      <Stack spacing={0.5} direction="row">
        <Typography variant="body1" sx={sx.value}>
          {value}
        </Typography>
        { icon && (
          <Icon name={icon} size={20} />
        )}
      </Stack>
		</Box>
	)
}

export default CartText

const sx = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	label: {
		color: 'text.secondary',
	},
	value: {
		textAlign: 'right',
	},
	discountCode: {
		cursor: 'pointer',
		color: 'text.secondary',
		textDecoration: 'underline',
	},
}
