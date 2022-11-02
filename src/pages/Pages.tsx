import { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import Triangle from "../components/Triangle"
import useLocalStorage from "../hooks/useLocalStorage"
import sessionManager from "../services/session-manager"
import Eight from "./Eight/Eight"
import Eleven from "./Eleven/Eleven"
import Five from "./Five/Five"
import Four from "./Four/Four"
import Nine from "./Nine/Nine"
import One from "./One/One"
import Seven from "./Seven/Seven"
import Six from "./Six/Six"
import Ten from "./Ten/Ten"
import Three from "./Three/Three"
import Two from "./Two/Two"

export const QuestionContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, () => {}])
export const AnswerContext = createContext<[string | null, React.Dispatch<React.SetStateAction<string | null>>]>(['', () => {}])

export default () => {
    const { page } = useParams()
    const [question, setQuestion] = useState(0);
    const [answer, setAnswer] = useState<string | null>(null);
    const [throttle, setThrottle] = useState(false);

    useEffect(() => {
        if(page === "1") {
            sessionManager.start();
        }

        sessionManager.page(page!);

        if (!throttle) {
            setThrottle(true);
            (async () => {
                await sessionManager.sendToServer();
            })();
            setTimeout(() => setThrottle(false), 1000);
        }

        if(page === "11") {
            sessionManager.end();
        }
    }, [page]);  


    return (
        <div className="overflow-hidden w-full h-full absolute top-0 left-0">
            {page === "1" && <One/>}
            {page === "2" && <Two/>}
            {page === "3" && <Three/>}
            {page === "4" && <Four/>}
            {page === "5" && <Five/>}
            {page === "6" && <Six/>}
            {page === "7" && <Seven/>}
            {page === "8" && <Eight/>}
            {page === "9" && <Nine/>} 
            <QuestionContext.Provider value={[question, setQuestion]}>
                <AnswerContext.Provider value={[answer, setAnswer]}>
                    {page === "10" && <Ten/>}
                    {[1, 2].every(n => n !== Number(page)) && <Navbar/>}
                </AnswerContext.Provider>
            </QuestionContext.Provider>
            {page === "11" && <Eleven/>}
            {Number(page) > 1 &&
            <p className="absolute text-2x z-50 bottom-0 left-2/4 -translate-x-2/4 font-bold2"><Triangle/> EVRENZO™ is subject to additional monitoring.</p>}
        </div>
    )
}