import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {

    const { currentExperince, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round((currentExperince) * 100 / experienceToNextLevel)

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>

            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: '50%' }}> {currentExperince} XP </span>
            </div>

            <span> {`${experienceToNextLevel}XP`}  </span>
        </header >
    );
}