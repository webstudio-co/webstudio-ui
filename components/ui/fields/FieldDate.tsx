import React from 'react'
import { FieldString } from 'webstudio/components/ui'
import { FieldWrapper } from 'webstudio/components/ui'
import moment from 'moment'

type FieldDateProps = {
	value?: any
	label?: string
	rest?: any
}

const FieldDate: React.FC<FieldDateProps> = (props) => {
	const { value, label, ...rest } = props
	let formattedValue = moment(value).format('MM/DD/YYYY')
	return (
		<FieldWrapper label={label} {...rest}>
			<FieldString value={formattedValue} />
		</FieldWrapper>
	)
}

export default FieldDate

const sx = {
	root: {},
}
