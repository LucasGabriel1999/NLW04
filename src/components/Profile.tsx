import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://instagram.fvag3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/125422214_720329088577094_3769001266417211907_n.jpg?_nc_ht=instagram.fvag3-1.fna.fbcdn.net&_nc_ohc=NBRgHDoWpBYAX9QC6p2&tp=1&oh=012e5ce5befe034a51cdc93c91a9702d&oe=605FA790" alt="Lucas Gabriel" />
            <div>
                <strong>Lucas Gabriel</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}</p>
            </div>
        </div>
    );
}