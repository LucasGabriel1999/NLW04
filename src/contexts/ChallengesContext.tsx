import { createContext, useState, ReactNode } from 'react';
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
    levelUp: () => void;
    startNewChallenges: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
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

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenges() {
        const randonChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengesIndex];

        setActiveChallenges(challenge);
    }

    function resetChallenge() {
        setActiveChallenges(null);
    }

    return (
        <ChallengesContext.Provider value={{ level, currentExperince, challengesCompleted, levelUp, startNewChallenges, activeChallenge, resetChallenge, experienceToNextLevel }}>
            {children}
        </ChallengesContext.Provider>
    );
} 