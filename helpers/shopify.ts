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
