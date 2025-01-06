import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

let client: Client | null = null
let selectedGroups: string[] = []

export async function initWhatsApp() {
  if (client) return client

  client = new Client({
    authStrategy: new LocalAuth()
  })

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log('Scan the QR code above to log in to WhatsApp Web')
  })

  client.on('ready', () => {
    console.log('WhatsApp client is ready')
  })

  await client.initialize()
  return client
}

export async function getWhatsAppGroups() {
  const client = await initWhatsApp()
  const chats = await client.getChats()
  return chats
    .filter(chat => chat.isGroup)
    .map(chat => ({ id: chat.id._serialized, name: chat.name }))
}

export async function updateSelectedGroups(groups: string[]) {
  selectedGroups = groups
}

export async function getMessagesFromSelectedGroups() {
  const client = await initWhatsApp()
  const messages = []

  for (const groupId of selectedGroups) {
    const chat = await client.getChatById(groupId)
    const groupMessages = await chat.fetchMessages({ limit: 100 })
    messages.push(...groupMessages.map(msg => ({
      groupId,
      groupName: chat.name,
      message: msg.body,
      timestamp: msg.timestamp
    })))
  }

  return messages
}

