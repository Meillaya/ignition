import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Messages - EcoWaste',
  description: 'Communicate with your clients or contractors',
}

const conversations = [
  { id: 1, name: 'John Doe', lastMessage: 'When will the pickup be?', unread: 2 },
  { id: 2, name: 'Jane Smith', lastMessage: 'The job is completed.', unread: 0 },
  { id: 3, name: 'Bob Johnson', lastMessage: 'Can we reschedule?', unread: 1 },
]

const messages = [
  { id: 1, sender: 'John Doe', content: 'Hello, I have a question about the waste pickup.', time: '10:30 AM' },
  { id: 2, sender: 'You', content: 'Sure, what would you like to know?', time: '10:32 AM' },
  { id: 3, sender: 'John Doe', content: 'When will the pickup be?', time: '10:35 AM' },
]

export default function MessagesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Messages</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {conversations.map((conversation) => (
                <li key={conversation.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer">
                  <div>
                    <p className="font-semibold">{conversation.name}</p>
                    <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge>{conversation.unread}</Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat with John Doe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-2 rounded-lg ${message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-right">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <Input className="flex-grow mr-2" placeholder="Type your message..." />
              <Button>
                Send <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

