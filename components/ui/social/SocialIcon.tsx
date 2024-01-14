import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { Icon } from 'webstudio/components'
import TikTok from 'assets/icons/tiktok-black.svg'
import Facebook from 'assets/icons/facebook-black.svg'
import Instagram from 'assets/icons/instagram-black.svg'
import LinkedIn from 'assets/icons/linkedin-black.svg'
import Twitter from 'assets/icons/twitter-black.svg'
import YouTube from 'assets/icons/youtube-black.svg'
import Image from 'next/image'

type SocialIconProps = {
	platform: string
	size?: number
	handleClick: () => void
}

const SocialIcon: React.FC<SocialIconProps> = (props) => {
	const { platform, handleClick, size = 20 } = props

	if (!platform) return null
	return (
		<IconButton size="small" sx={sx.icon} onClick={handleClick}>
			{platform === 'facebook' && (
				<Image alt="Facebook" src={Facebook} height={size} width={size} />
			)}
			{platform === 'instagram' && (
				<Image alt="Instagram" src={Instagram} height={size} width={size} />
			)}
			{platform === 'linkedin' && (
				<Image alt="LinkedIn" src={LinkedIn} height={size} width={size} />
			)}
			{platform === 'youtube' && (
				<Image alt="YouTube" src={YouTube} height={size} width={size} />
			)}
			{platform === 'tiktok' && (
				<Image alt="TikTok" src={TikTok} height={size} width={size} />
			)}
			{platform === 'twitter' && (
				<Image alt="Twitter" src={Twitter} height={size} width={size} />
			)}
			{platform === 'copy' && <Icon name="Copy" />}
			{platform === 'email' && <Icon name="Send" />}
		</IconButton>
	)
}

export default SocialIcon

const sx = {
	icon: {
		opacity: 0.9,
		'&:hover': {
			opacity: 1,
		},
	},
}
