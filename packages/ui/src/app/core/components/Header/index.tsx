import './header.scss';
import { NavLink } from 'react-router';

function Header() {
	return (
		<header className="header">
			<ul className="header__list">
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'header__list__link header__list__link--active' : 'header__list__link'
						}
						to="/"
					>
						Accueil
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'header__list__link header__list__link--active' : 'header__list__link'
						}
						to="/jobs"
					>
						Jobs
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'header__list__link header__list__link--active' : 'header__list__link'
						}
						to="/statistics"
					>
						Statistiques
					</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
