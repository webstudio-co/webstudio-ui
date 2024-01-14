import React, { useState, useEffect } from 'react'
import { CookieValueTypes, getCookie, setCookie } from 'cookies-next'
import { Product } from '@webstudio/shopify'

type RecentlyViewedProps = {
  cookie?: CookieValueTypes | string
}

const useRecentlyViewed = (props?: RecentlyViewedProps) => {

  const { cookie="recently-viewed" } = props || {}

  const [products, setProducts] = useState<Product[]>([])  

  const viewProduct = (product) => {
    let newProduct = {
      id: product?.id,
      handle: product?.handle,
      images: product?.images,
      title: product?.title,      
      priceRange: { 
        minVariantPrice: {
          amount: product?.priceRange?.minVariantPrice?.amount,
        },
        maxVariantPrice: {
          amount: product?.priceRange?.maxVariantPrice?.amount,
        }
      }      
    }
    let recentlyViewed = [...products]
    let index = products?.findIndex((p) => p?.handle === product?.handle)
    if(index > -1){
      recentlyViewed = products?.splice(index, 1)  
      recentlyViewed.unshift(newProduct)
    }else{
      recentlyViewed.unshift(newProduct)
    }
    // @ts-ignore
    setCookie(cookie, JSON.stringify(recentlyViewed))
  }

  const removeProduct = (product) => {
    let recentlyViewed = products?.filter((p) => p?.handle !== product?.handle)    
    // @ts-ignore
    setCookie(cookie, JSON.stringify(recentlyViewed))
  }

  useEffect(() => {
    let localCookie = getCookie(cookie)
    if(localCookie){
      // @ts-ignore
      let recentlyViewed = JSON.parse(localCookie) || []
      setProducts(recentlyViewed)
    }
  }, [])

  return {
    products,
    viewProduct,
    removeProduct,
  }
}

export default useRecentlyViewed