import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperince: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenges: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;

}


interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperince, setcurrentExperince] = useState(0);
    const [challengesCompleted, setchallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenges] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenges() {
        const randonChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengesIndex];

        setActiveChallenges(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio 🎉', {
                body: `Valendo ${challenge.amount}XP!`
            })

        }
    }


    function resetChallenge() {
        setActiveChallenges(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperince + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setcurrentExperince(finalExperience);
        setActiveChallenges(null);
        setchallengesCompleted(challengesCompleted + 1);

    }

    return (
        <ChallengesContext.Provider value={{ level, currentExperince, challengesCompleted, levelUp, startNewChallenges, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, }}>
            {children}
        </ChallengesContext.Provider>
    );
}