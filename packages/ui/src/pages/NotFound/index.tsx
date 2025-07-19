import './not-found.scss';

function NotFound() {
	return (
		<main className="not-found">
			<h1 className="not-found__title">Erreur 404</h1>
			<p className="not-found__content">Oups, nous n'avons pas pu trouvé la ressource demandée.</p>
		</main>
	);
}

export default NotFound;
