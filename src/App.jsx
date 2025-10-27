import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Chat from './components/Chat'

// TODO: Signals were found not to be working properly, we'll come back to this!
// Docs: https://preactjs.com/guide/v10/signals

export default function App() {

  // Simple custom language switch for the links, currently applied only to Footer
  // Check links.js and Footer.jsx for more context
  const [currentLangue, setCurrentLanguage] = useState('fi')

  const toggleLangue = () => {
    if (currentLangue === 'fi') {
      setCurrentLanguage('en')
    } else {
      setCurrentLanguage('fi')
    }
  }

  return <>
    {/* Check the Drawer.jsx for more context! */}
    <Header toggleLangue={toggleLangue} currentLangue={currentLangue}></Header>
    <Drawer>
      <main className="h-screen flex-grow justify-items-center">

        <div className='card w-96 max-h-120 bg-cyan-400 shadow-xl m-4 bg-[url(/tech.jpg)] bg-repeat-none'>
          <Chat></Chat>
        </div>

      </main>

    </Drawer>
    <Footer currentLangue={currentLangue}></Footer>

  </>

}