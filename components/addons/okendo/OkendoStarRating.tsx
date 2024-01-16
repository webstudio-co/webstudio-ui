import React, { useRef, useEffect } from 'react'
import { getShopifyIdFromGid } from '@webstudio/shopify/helpers'
import { Product } from '@webstudio/shopify/types'
import { useTheme } from '@mui/material'

type OkendoStarRatingProps = {
  product?: Product
}

const OkendoStarRating: React.FC<OkendoStarRatingProps> = (props) => {

  const { product } = props
  const theme = useTheme()
  const widgetContainer = useRef(null)

  const initialiseWidget = () =>
    window.okeWidgetApi.initWidget(widgetContainer.current)

  useEffect(() => {
    if (window.okeWidgetApi?.initWidget) {
      initialiseWidget()
    } else {
      document.addEventListener('oke-script-loaded', initialiseWidget)
    }
    return () => {
      document.removeEventListener('oke-script-loaded', initialiseWidget)
    } 
  }, [product?.id])

  if(!product?.id) return null;
  return (
    <div
      style={{ color: theme?.palette?.text.secondary  }}
      ref={widgetContainer}
      data-oke-star-rating
      data-oke-reviews-product-id={`shopify-${getShopifyIdFromGid(product?.id)}`}
    />    
  )
}

export default OkendoStarRating