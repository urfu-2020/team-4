export interface IUserData {
    id: string
    nickname: string
    avatar: string
}

export interface IChatData {
    id: string
    name: string
    members: IUserData[]
}

export interface IMessageData {
    id: string
    text: string
    timestamp: Date
    author: IUserData
}
