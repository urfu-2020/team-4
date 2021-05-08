export interface IUserData {
    id: string
    nickname: string
    avatar: string
}

export interface IMessageData {
    id: string
    text: string
    timestamp: Date
    author: IUserData
}
