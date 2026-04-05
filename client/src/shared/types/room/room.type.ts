import type { CurrentRoomQuery, UserRoomsQuery } from '@/__generated__/output'

export type TypeRooms = UserRoomsQuery['userRooms']
export type TypeRoom = TypeRooms[0]
export type TypeCurrentRoom = NonNullable<CurrentRoomQuery['currentRoom']>
