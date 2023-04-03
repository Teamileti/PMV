
export interface Message{
  id: string,
  content: string,
  type: {
    priority: string,
    duration: any
  }
}
