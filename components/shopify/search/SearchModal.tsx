import React, { useEffect, useContext, useState } from 'react'
import { TextInput, Placeholder } from 'webstudio/components'
import { ProductGrid } from 'webstudio/components/shopify'
import {
	AppBar,
	Stack,
	SwipeableDrawer,
	Container,
	Box,
	IconButton,
} from '@mui/material'
import { ShopContext } from '@webstudio/shopify/context'
import { useProducts } from '@webstudio/shopify/hooks'
import { useSegment } from 'webstudio/hooks/addons'
import { X, Search } from 'lucide-react'
import { useTheme } from '@mui/material/styles'

const SearchModal: React.FC = () => {
	// Minimum number of characters to track analytics

	const theme = useTheme()
	const MIN_ANALYTICS_CHARS = 5

	const { trackProductsSearched } = useSegment()
	const { setMenuOpen } = useContext(ShopContext)

	const [expanded, setExpanded] = useState(false)
	const [keywords, setKeywords] = useState('')

	const { searchOpen, setSearchOpen } = useContext(ShopContext)

	const { loading, products, setProducts, searchProducts } = useProducts()

	const handleChange = (ev) => {
		setKeywords(ev.target.value)
	}

	const handleClose = () => {
		handleClear()
		setMenuOpen(false)
		setSearchOpen(false)
		setProducts(null)
		setExpanded(false)
	}

	const handleClear = () => setKeywords('')

	const handleSearch = () => {
		if (keywords?.length >= MIN_ANALYTICS_CHARS) {
			trackProductsSearched(keywords)
		}
		setExpanded(true)
		searchProducts({ query: keywords })
	}

	useEffect(() => {
		if (keywords?.length > 0) {
			handleSearch()
		} else {
			setProducts(null)
			setExpanded(false)
		}
	}, [keywords])

	return (
		<SwipeableDrawer
			onOpen={() => null}
			open={searchOpen}
			anchor="top"
			onClose={handleClose}
			PaperProps={{ sx: sx.paper }}
		>
			<Box
				sx={{
					...sx.container,
					...(expanded && sx.expandedModal),
				}}
			>
				<AppBar elevation={0} position="sticky" color="transparent">
					<Stack sx={sx.searchContainer} direction="row" spacing={1}>
						<Box sx={sx.spacer}></Box>
						<Box sx={sx.searchInput}>
							<TextInput
								name="keywords"
								value={keywords}
								handleChange={handleChange}
								placeholder={'Search...'}
							/>
						</Box>
						<Box sx={sx.spacer}>
							<IconButton onClick={handleClose}>
								<X size={24} color={theme.palette.text.primary} />
							</IconButton>
						</Box>
					</Stack>
				</AppBar>
				<Container maxWidth="md">
					<ProductGrid
						loading={loading}
						products={products}
						xs={12}
						sm={12}
						md={6}
						lg={6}
						xl={6}
					/>
					{keywords?.length > 0 && !loading && products?.length == 0 && (
						<Placeholder
							icon={<Search />}
							title="No search results"
							description="Try another search term"
						/>
					)}
				</Container>
			</Box>
		</SwipeableDrawer>
	)
}

export default SearchModal

const sx = {
	container: {
		width: '100vw',
		backgroundColor: 'primary.contrastText',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		transition: 'all 0.2s ease-in-out',
		overflowY: 'scroll',
	},
	expandedModal: {
		height: '90vh',
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		bgcolor: 'background.default',
		py: 2,
		px: 1,
	},
	searchInput: {
		width: '100%',
		maxWidth: '600px',
	},
	closeButton: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
	},
	placeholder: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	spacer: {
		width: '40px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		bgcolor: 'background.paper',
	},
}
