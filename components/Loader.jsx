import React from 'react';
import styles from '../styles/Home.module.css';

const Loader = () => {
	return (
		<div className={styles.container}>
			<span className={styles.loader}></span>
			<p>Minting your NFT</p>
		</div>
	);
};

export default Loader;
