import './home.scss';
import { NavLink } from 'react-router';

function Home() {
	return (
		<main className="home">
			<h1>
				<NavLink className="home__title" to="/jobs">
					Jobtalk
				</NavLink>
			</h1>
			<p>
				Bienvenue sur <strong>Jobtalk</strong>, la plateforme n°1 des offres d'emploi en France.
			</p>
			<div className="home__image"></div>
		</main>
	);
}

export default Home;
