import { AnimatePresence, motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import Disclaimer from "../../components/Disclaimer"
import SlideContext from "../../contexts/SlideContext"
import useLocalStorage from "../../hooks/useLocalStorage"
import { AnswerContext, QuestionContext } from "../Pages"
import questions from "./questions.json"

export default () => {
    const [slideDirection] = useContext(SlideContext)
    const [question, setQuestion] = useContext(QuestionContext)
    const [answer, setAnswer] = useContext(AnswerContext)
    const [score, setScore] = useLocalStorage('score', 0)

    useEffect(() => {
        setScore(0)
    }, [])
    
    return (
        <motion.article 
        variants={slideDirection} exit="exit" animate="animate" initial="initial"
        style={{ backgroundImage: `url(./images/bg.png)`}}
        className="absolute flex items-center flex-col w-full h-full bg-cover bg-fixed bg-center text-black p-48 pb-12">
            <header className="flex justify-between text-gray-700 w-full">
                <h1 className="text-5x text-primary">
                    Question {question + 1}
                </h1>
                <Disclaimer/>
            </header>
            <div className="text-2xx text-center w-[1930px] gap-10 h-full -translate-y-40 flex flex-col items-center justify-center">
                <div>
                    {questions.map(({question: questionText, answer: questionAnswer, choices}, i) => {
                        return (
                            <>
                                {question === i &&
                                    <div className="relative flex flex-col items-center gap-10">
                                        <h1 className="text-8xl w-[2300px]">{questionText}</h1>
                                        <div className="flex flex-col gap-7 font-bold2">
                                            <AnimatePresence mode="wait">
                                                {choices.map((choice, key) => {
                                                    const choiceSelected = choice === answer;
                                                    const choiceCorrect = choice === questionAnswer;

                                                    return (
                                                        <motion.div key={key} transition={{delay: 0.3*(key+1)}} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                                        className="relative">
                                                            <p className={`${answer === null ? "bg-[#007A33]" : questionAnswer === choice ? "bg-[#007A33]" : answer === choice ? "bg-white text-black" : "bg-[#4D4D4F]"} px-48 w-[2300px] text-4x h-[240px] text-white flex items-center justify-center`}
                                                            onClick={() => {
                                                                if(answer === null) {
                                                                    setAnswer(choice);
                                                                    if(choice === questionAnswer) {
                                                                        setScore(score + 1)
                                                                    }
                                                                }
                                                            }}>{choice}</p>
                                                            { answer !== null && choiceSelected && !choiceCorrect && 
                                                            <img className="absolute right-14 top-2/4 -translate-y-2/4 mr-5 w-12 aspect-square" src="./images/cross.svg" alt="incorrect"/> }
                                                            {answer !== null && choiceCorrect &&
                                                            <img className="absolute right-14 top-2/4 -translate-y-2/4 mr-5 w-12 aspect-square" src="./images/checkmark.svg" alt="correct"/> }
                                                        </motion.div>
                                                    )
                                                })}
                                            </AnimatePresence>
                                        </div>
                                        <div className="absolute -bottom-60 text-[88px] font-bold-ext">
                                            {answer !== null && (questionAnswer === answer
                                                ? <p className="text-[#007A33]">CORRECT</p>
                                                : <p className="text-[#007A33]">INCORRECT</p>
                                            )}
                                        </div> 
                                    </div>
                                }
                            </>
                        )
                    })}
                </div>
            </div>
        </motion.article>
    )
}