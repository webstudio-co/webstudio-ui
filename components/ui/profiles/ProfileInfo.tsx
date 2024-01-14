import React from 'react'
import { Box, Stack } from '@mui/material'
import { SocialIcons, FieldString, FieldText } from 'webstudio/components'

type ProfileInfoProps = {
	title: string
	description: string
	label?: string
	socialUrls?: string[]
}

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
	const { title, description, label, socialUrls = [] } = props
	return (
		<Stack direction="column" spacing={1}>
			<Stack direction="column">
				<FieldString value={label} variant="caption" color="text.secondary" />
				<FieldString value={title} />
				<FieldText value={description} variant="body2" color="text.secondary" />
			</Stack>
			{socialUrls?.length > 0 && <SocialIcons urls={socialUrls} />}
		</Stack>
	)
}

export default ProfileInfo
