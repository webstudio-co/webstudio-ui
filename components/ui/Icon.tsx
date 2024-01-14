import { useTheme } from '@mui/material'
import * as icons from 'lucide-react'
import { get } from 'lodash'

type LucideIconProps = {
	name: string
	color?: string
	size?: number
}

const LucideIcon: React.FC<LucideIconProps> = (props) => {
	const { name, color = 'text.primary', size = 24 } = props
	const theme = useTheme()
	const Icon = icons[name]
	return Icon && <Icon color={get(theme.palette, color)} size={size} />
}
export default LucideIcon
