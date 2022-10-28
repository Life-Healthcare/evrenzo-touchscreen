import { motion } from "framer-motion"
import { useContext } from "react"
import Disclaimer from "../../components/Disclaimer";
import Superscript from "../../components/Superscript";
import SlideContext from "../../contexts/SlideContext"

export default () => {
    const [slideDirection] = useContext(SlideContext);

    return (
        <motion.article 
        variants={slideDirection} exit="exit" animate="animate" initial="initial"
        style={{ backgroundImage: `url(./images/bg.png)`}}
        className="absolute flex flex-col w-full h-full bg-cover bg-fixed bg-center text-black p-48">
            <header className="flex justify-between text-gray-700">
                <h1 className="text-5x text-primary w-[2900px] leading-[90px]">
                Raise Hb without increasing CV risk compared
to ESA in patients not on dialysis or those just started on dialysis
                </h1>
                <Disclaimer/>
            </header>
            <section className="flex flex-col items-center gap-20 text-3x -mt-16">
                <div className="flex justify-center items-center w-full mt-20">
                    <div className="flex flex-col grow">
                        <h2 className="w-[2284px]">
                        The CV safety profile of EVRENZO was assessed in a meta-analysis of adjudicated
major adverse cardiovascular events (MACE)<Superscript>1,2</Superscript>
                        </h2>
                        <h2 className="w-[2600px]">
No evidence of increased risk of major cardiovascular events or ACM with EVRENZO vs. ESA in a pool of patients not on dialysis and those just started on dialysis<Superscript>1,2</Superscript>
                        </h2>
                        <div className="flex justify-center">
                            <img className="w-[94%]" src="./images/6img1.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <footer className="flex justify-between items-center gap-20 text-1x text-start relative z-10 mt-12">
                <ul>
                <li>1. EVRENZO EU SmPC, September 2022.</li>
                <li>2. Barratt J et al. Nephrol Dial Transplant. 2022;37(Supplement_3):i387–i388.</li>
                <li>3. Barratt J et al. Nephrol Dial Transplant. 2021;36(9):1616–1628.</li>
                <li>4. Charytan C et al. Kidney Int Rep. 2021;6(7):1829–1839.</li>
                </ul>
                <p className="w-[1150px] mr-60 -translate-y-5">
                The general safety profile of EVRENZO was overall comparable to ESA for the majority of safety variables evaluated and is reflective of the studied CKD populations<Superscript>1,3,4</Superscript>
                </p>
            </footer>
        </motion.article>
    )
}