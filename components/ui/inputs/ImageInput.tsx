import React from 'react'
import { AttachmentInput } from 'webstudio/components/ui'
import { AttachmentInputProps } from 'webstudio/types'

const ImageInput: React.FC<AttachmentInputProps> = (props) => {
	return <AttachmentInput {...props} variant="image" />
}

export default ImageInput
