export const formatCurrency = (money, digits = 2) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: digits,
		minimumFractionDigits: digits,
	}).format(money)
}

export const shopifyResizeImage = (url, { height, width }) => {
	if (!url) return
	let extension = url.split('.').pop()
	let filePath = url.split(`.${extension}`)[0]
	let resizedUrl = `${filePath}_${width}x${height}.${extension}?q=100`
	return resizedUrl
}

export const findVariantByColor = (product, color) => {
	let productVariant = product?.variants?.edges?.find(({ node: variant }) => {
		return variant?.selectedOptions?.find((selectedOption) => {
			return selectedOption?.name == 'Color' && selectedOption?.value == color
		})
	})
	return productVariant?.node
}

export const findPriceFilter = (filters) => {
	return filters
		.filter((filter) => filter?.priceRange)
		.map((filter) => filter?.priceRange)
}

export const findAvailableFilter = (filters) => {
	return filters.find(
		(filter) => filter?.available === true || filter?.available === false
	)?.available
}

export const findProductTypeFilters = (filters) => {
	return filters
		.filter((filter) => filter?.productType)
		.map((filter) => filter?.productType)
}

export const findVendorFilters = (filters) => {
	return filters
		.filter((filter) => filter?.productVendor)
		.map((filter) => filter?.productVendor)
}

export const findColorFilters = (filters) => {
	return findVariantFilters('color', filters)
}

export const findSizeFilters = (filters) => {
	return findVariantFilters('size', filters)
}

export const findMaterialFilters = (filters) => {
	return findVariantFilters('material', filters)
}

export const findStyleFilters = (filters) => {
	return findVariantFilters('style', filters)
}

export const findTagFilters = (filters) => {
	return filters.filter((filter) => filter?.tag).map((filter) => filter?.tag)
}

export const findVariantFilters = (name, filters) => {
	return filters
		.filter((filter) => filter?.variantOption?.name === name)
		.map((filter) => filter?.variantOption?.value)
}


export const getSellingPlanDescription = (sellingPlan) => {
  let adjustment = (sellingPlan?.priceAdjustments && sellingPlan?.priceAdjustments[0]?.adjustmentValue) || {}
  let savingsDescription = 'Save'
  if (adjustment?.adjustmentPercentage) {    
    savingsDescription += ` ${adjustment.adjustmentPercentage}%`    
  } else if (adjustment?.price?.amount) {
    savingsDescription += ` $${adjustment.price.amount}`
  } else if (adjustment?.adjustmentAmount?.amount) {
    savingsDescription += ` ${adjustment.adjustmentAmount.amount}`
  }
  return savingsDescription
}

export const getSellingPlanPrice = (variant, sellingPlan) => {
  const originalPrice = variant?.price?.amount  
  let adjustment = (sellingPlan?.priceAdjustments && sellingPlan?.priceAdjustments[0]?.adjustmentValue) || {}
  let discountedPrice = originalPrice
  if (adjustment?.adjustmentPercentage) {
    discountedPrice = originalPrice - (originalPrice * adjustment.adjustmentPercentage) / 100
  } else if (adjustment?.price?.amount) {
    discountedPrice = adjustment.price.amount
  } else if (adjustment?.adjustmentAmount?.amount) {
    discountedPrice = originalPrice - adjustment.adjustmentAmount.amount
  }
  return discountedPrice
}

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
	let orderId = orderGid.split('/')[-1]
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
