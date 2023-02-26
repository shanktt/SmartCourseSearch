import {ThemeProvider} from 'styled-components'
import {Open_Sans, Buenard} from '@next/font/google'
import GlobalStyle from '../components/globalStyles'
const openSans = Open_Sans({subsets: ['latin'], variable: '--font-open'},)
const buenard = Buenard({weight: "700", variable: '--font-b', subsets: ['latin'],})

const theme = {
    colors: {
        primary: '#FBFBFF',
        secondary: '#000000',
        green: '#39ff14',
        blue: '#89CFF0',
        pink: '#FF1f8f'
    },
}

function MyApp({
                   Component,
                   pageProps: {session, ...pageProps},
               }) {


    return (
            <ThemeProvider theme={theme}>

                    <GlobalStyle/>
                    <main className={`${openSans.className} ${openSans.variable} font-sans`}>
                        <style jsx global>{`
                          :root {
                            --font-b: ${buenard.style.fontFamily};
                          }
                        `}</style>
                        <Component {...pageProps} />
                    </main>

            </ThemeProvider>
    )
}

export default MyApp