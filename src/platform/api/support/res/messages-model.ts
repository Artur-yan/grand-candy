interface IMessagesModel {
  conversationId: number
  elementsLeft: number
  messagePreviewDTOS: [
    {
      date: number
      file: File
      messageId: number
      messageImageUrls: []
      messageType: number
      messageUniqueId: string
      text: string
      user: {
        role: string
        userId: number
        userImageUrl: string
      }
    }]
  participant: number
}