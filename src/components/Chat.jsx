import { useState } from "react"

const OLLAMA_API_URL = 'http://localhost:11434/api/chat'

async function callOllama(messages = []) {
    
    const body = {
        model: 'gemma3:1b',
        messages: messages,
        stream: false
    }
    
    const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    if(!response.ok){
        throw new Error(`Ollama API call failed with status: ${response.status}`)
    }
    
    const data = await response.json()

    const {message: {role, content}, created_at} = data

    return {
        role,
        content,
        created_at,
        isOwn: false
    }

}

function ChatMessage({ content, isOwn, created_at }) {
    return <div className={`chat ${isOwn ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-header text-white"> {isOwn ? 'User' : 'Lumi'} {new Date(created_at).toLocaleString('fi')} </div>
        <div className="chat-bubble">{content}</div>
    </div>
}

export default function Chat() {

    // 1. Chat komponentti renderöidään ensimmäisen kerran
    // - Alustetaan messages tila esimerkkiviesteillä
    // 2. Käyttäjä kirjoittaa uuden viestin tekstialueelle
    // - onInputChange päivittää newMessage tilan
    // 3. Käyttäjä klikkaa "Send" nappia
    // - sendMessage funktio lisää newMessage viestin messages-tilaan
    // - viesti 
    // - newMessage tila tyhjennetään
    // 4. Komponentti renderöidään uudelleen päivitetyillä messages tilalla
    // - Uusi viesti näkyy chat-ikkunassa


    const messageData = [
        {
            content: "Olet avulias assistentti nimeltä Lumi, joka puhuu suomea.",
            created_at: new Date().toISOString(),
            isOwn: false,
            role: "system"
        },
    ]
    const [messages, setMessages] = useState(messageData)
    const [newMessage, setNewMessage] = useState('')

    const onInputChange = (e) => {
        setNewMessage(() => e.target.value)
    }

    const sendMessage = async () => {

        // Luodaan uusi käyttäjän viesti objektina samassa formaatissa kuin muut viestit
        const newUserMessage = {
            role: "user",
            content: newMessage,
            isOwn: true,
            created_at: new Date().toISOString()
        }

        // Lisätään uusi käyttäjän viesti viestilistaan, ei päivtä vielä tilaa.
        const currentMessages = [...messages, newUserMessage]

        // Päivitetään tila näyttämään uusi käyttäjän viesti
        setMessages(() => currentMessages)

        // Tyhjennetään textarean tekstikenttä
        setNewMessage(() => '')
        
        // Kutsutaan Ollama API:ta viestihistorian ja uuden käyttäjän viestin kanssa,
        // saadaan vastausviestinä tekoälyn vastaus viestiketjuun
        const ollamaMessage = await callOllama(currentMessages)

        // Päivitetään Chat-komponentin tila lisäämällä Ollaman vastausviesti viestilistaan
        setMessages(() => [...currentMessages, ollamaMessage])

    }


    return <div className="backdrop-blur-[12px] w-full h-full">

        <div className="min-h-54 max-h-120 overflow-y-auto">

            {messages.map((message, i) => <ChatMessage {...message}></ChatMessage>)}

        </div>

        <div className="flex column items-center">

            <textarea className="textarea flex-9" value={newMessage} onChange={onInputChange}></textarea>
            <button className="btn btn-secondary flex-1 " onClick={sendMessage}>Send</button>
        
        </div>

    </div>
}
