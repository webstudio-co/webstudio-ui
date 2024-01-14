// Metafield helpers
export const getField = (object, key) => {
	return object?.fields?.find((field) => field?.key == key)
}

export const getValue = (object, key) => {
	let field = getField(object, key)
	return field?.value
}

export const getMetafield = (metaobject, key) => {
	return metaobject?.metafields?.find((field) => field?.key == key)
}

export const getMetaValue = (metaobject, key) => {
	let field = getMetafield(metaobject, key)
	return field?.value
}

export const getMetaImage = (metaobject, key) => {
	let field = getMetafield(metaobject, key)
	return field?.reference?.image?.url
}

export const getMetaReference = (metaobject, key) => {
	let field = getMetafield(metaobject, key)
	return field?.reference
}

export const getMetaReferences = (metaobject, key) => {
	let field = getMetafield(metaobject, key)
	return field?.references?.edges.map((e) => e.node)
}

export const getArrayFromString = (stringArray) => {
	let jsonValues = JSON.parse(`{ "values": ${stringArray} }`)
	return jsonValues?.values
}

export const truncate = (str, n) => {
	return str?.length > n ? str.substr(0, n - 1) + '...' : str
}

export const shopifyResizeImage = (url, { height, width }) => {
	if (!url) return
	let extension = url.split('.').pop()
	let filePath = url.split(`.${extension}`)[0]
	let resizedUrl = `${filePath}_${width}x${height}.${extension}`
	return resizedUrl
}

export const formatCurrency = (money, digits = 2) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: digits,
		minimumFractionDigits: digits,
	}).format(money)
}

// Shopify will render single SKU products with title 'Default Title'
export const renderMerchandiseTitle = (merchandise) => {
	if (merchandise?.title != 'Default Title') {
		return merchandise?.title
	} else {
		return merchandise?.product?.title
	}
}

export const renderLineItemPrice = (line) => {
	if (line?.sellingPlanAllocation) {
		return formatCurrency(
			line?.sellingPlanAllocation?.priceAdjustments[0]?.price?.amount
		)
	} else {
		return formatCurrency(line?.merchandise?.price?.amount)
	}
}

export const renderLineItemCompareAtPrice = (line) => {
	if (line?.sellingPlanAllocation) {
		return formatCurrency(
			line?.sellingPlanAllocation?.priceAdjustments[0]?.compareAtPrice?.amount
		)
	} else {
		return formatCurrency(line?.merchandise?.price?.amount)
	}
}

const decodeBase64 = (data) => {
	return Buffer.from(data, 'base64').toString('ascii')
}

export const getBase64DecodedId = (id) => {
	let orderGid = decodeBase64(id)
	let orderId = orderGid.split('/').at(-1)
	return orderId.split('?')[0]
}

// NextJS Image has trouble rendering SVG icons if file ext does not end in .svg
// such as ?variant=1234567890 so a fix here is to strip params from url
export function stripParams(src) {
	return src?.split('?')[0]
}

export const getShopifyIdFromGid = (gid) => {
	const parsedURL = new URL(gid)
	const pathname = parsedURL.pathname
	var segments = pathname.split('/')
	var finalSegment = segments[segments.length - 1]
	return finalSegment
}
