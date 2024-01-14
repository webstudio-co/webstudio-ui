import breakpoints from 'webstudio/theme/breakpoints'

const {
	values: { xs, sm, md, lg, xl },
} = breakpoints

export const CAROUSEL_RESPONSIVE = {
	superLargeDesktop: {
		breakpoint: { max: xl, min: lg },
		items: 3,
	},
	desktop: {
		breakpoint: { max: lg, min: md },
		items: 3,
	},
	tablet: {
		breakpoint: { max: md, min: sm },
		items: 2,
	},
	mobile: {
		breakpoint: { max: sm, min: xs },
		items: 1,
	},
}

export const IMAGE_CAROUSEL_RESPONSIVE = {
	superLargeDesktop: {
		breakpoint: { max: xl, min: lg },
		items: 1,
	},
	desktop: {
		breakpoint: { max: lg, min: md },
		items: 1,
	},
	tablet: {
		breakpoint: { max: md, min: sm },
		items: 1,
	},
	mobile: {
		breakpoint: { max: sm, min: xs },
		items: 1,
	},
}

export const PRODUCT_CAROUSEL_RESPONSIVE = {
	superLargeDesktop: {
		breakpoint: { max: xl, min: lg },
		items: 3,
	},
	desktop: {
		breakpoint: { max: lg, min: md },
		items: 3,
	},
	tablet: {
		breakpoint: { max: md, min: sm },
		items: 3,
	},
	mobile: {
		breakpoint: { max: sm, min: xs },
		items: 1,
	},
}
