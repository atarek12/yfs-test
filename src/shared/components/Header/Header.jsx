import classes from './Header.module.css';

export default function Header() {
	return (
		<header className={classes.header}>
			<div className={classes.wrapper + ' container'}>
				<div>
					<h1 className={classes.logo}>YFS</h1>
				</div>
				<div>
					<span className={classes.username}>Hi Admin</span>
				</div>
			</div>
		</header>
	);
}
