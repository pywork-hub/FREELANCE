import type { TypeRooms } from '@/shared/types/room/room.type'
import { useState, type ChangeEvent } from 'react'

export const useSearchRoom = (rooms: TypeRooms) => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const queriedRooms = searchTerm
		? rooms.filter((room) => {
				const searchTermLower = searchTerm.toLowerCase()
				const partnerLoginLower = room.partner.profile.login.toLowerCase()
				return partnerLoginLower.includes(searchTermLower)
		  })
		: rooms

	return { searchTerm, handleSearch, queriedRooms }
}
