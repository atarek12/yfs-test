import React from 'react';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner = ({ asOverlay }) => {
	return (
		<div className={asOverlay && classes.overlay}>
			<div className={classes.lds_dual_ring}></div>
		</div>
	);
};

export default LoadingSpinner;
