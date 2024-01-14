import React from 'react'
import { Stack } from '@mui/material'
import SocialIcon from './SocialIcon'

type SocialIconsProps = {
	urls: string[]
}

const SocialIcons: React.FC<SocialIconsProps> = (props) => {
	const { urls } = props

	function addHttpsToUrl(url: string) {
		if (!/^https?:\/\//i.test(url)) {
			url = 'https://' + url
		}
		return url
	}

	const handleClick = (url: string) => {
		window.open(addHttpsToUrl(url), '_blank')
	}

	const getSocialFromUrl = (url: string) => {
		// Regular expressions for matching the hostnames
		const facebookRegex = /facebook\.com/i
		const instagramRegex = /instagram\.com/i
		const tiktokRegex = /tiktok\.com/i
		const linkedinRegex = /linkedin\.com/i
		const twitterRegex = /twitter\.com/i
		const youtubeRegex = /youtube\.com/i

		// Initialize a variable to store the result
		let platform
		// Use regular expressions to determine the platform
		if (facebookRegex.test(url)) {
			platform = 'facebook'
		} else if (instagramRegex.test(url)) {
			platform = 'instagram'
		} else if (tiktokRegex.test(url)) {
			platform = 'tiktok'
		} else if (linkedinRegex.test(url)) {
			platform = 'linkedin'
		} else if (youtubeRegex.test(url)) {
			platform = 'youtube'
		} else if (twitterRegex.test(url)) {
			platform = 'twitter'
		} else {
			platform = null
		}

		return platform
	}

	return (
		<Stack direction="row" spacing={1}>
			{urls?.map((url) => {
				let platform = getSocialFromUrl(url)
				return (
					<SocialIcon
						platform={platform}
						handleClick={() => handleClick(url)}
					/>
				)
			})}
		</Stack>
	)
}

export default SocialIcons
