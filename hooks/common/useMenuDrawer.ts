import React, { useContext } from 'react'
import { LayoutContext } from 'context'

const useMenuDrawer = () => {
	const { showMenu, setShowMenu } = useContext(LayoutContext)

	const closeMenu = () => setShowMenu(false)
	const toggleMenu = () => setShowMenu(!showMenu)

	return {
		open: showMenu,
		setOpen: setShowMenu,
		closeMenu,
		toggleMenu,
	}
}

export default useMenuDrawer
