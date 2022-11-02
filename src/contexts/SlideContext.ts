import { createContext } from "react";

export const right = {
    initial: {
        x: "200vw",
        transition: {
            duration: 0.4
        }
    },
    animate: {
        x: "0",
        transition: {
            duration: 0.4
        }
    },
    exit: {
        x: "-200vw",
        transition: {
            duration: 0.4
        }
    },
}

export const left = {
    initial: {
        x: "-200vw",
        transition: {
            duration: 0.4
        }
    },
    animate: {
        x: "0",
        transition: {
            duration: 0.4
        }
    },
    exit: {
        x: "200vw",
        transition: {
            duration: 0.4
        }
    },
}

export default createContext<any>(null);