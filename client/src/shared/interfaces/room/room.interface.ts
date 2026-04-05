import type {
	TypeCurrentRoom,
	TypeRoom,
	TypeRooms,
} from '@/shared/types/room/room.type'

export interface IRooms {
	rooms: TypeRooms
	variant: 'current' | 'all'
}

export interface IRoom {
	room: TypeRoom
}

export interface ICurrentRoom {
	room: TypeCurrentRoom
}

export interface IRoomId {
	roomId: number
}