import useJobStatisticsData from '../../hooks/api/useJobStatisticsData';

import './statistics.scss';
import { ContractMappingFromContractTypeToUsers } from '../../mappers/contract-mapping-to-users';
import { JobMappingFromJobTypeToUsers } from '../../mappers/job-mapping';
import Loader from '../../components/Loader';
import CustomError from '../../components/CustomError';

function Statistics() {
	const { jobStatistics, isLoading, error } = useJobStatisticsData();

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <CustomError error={error} />;
	}

	const { averageSalary, mostCommonContractType, mostCommonJobTitle, offersPerCity } =
		jobStatistics;

	return (
		<main className="stats">
			<h1>Statistiques des offres d'emploi</h1>
			<p className="stats__description">
				<b>Rémunération moyenne annuelle brut :</b>{' '}
				{typeof averageSalary != 'number'
					? "Pas d'information"
					: averageSalary.toLocaleString('fr-FR', {
							currency: 'EUR',
							style: 'currency',
						})}
			</p>
			<p className="stats__description">
				<b>Type de contrat le plus courant :</b>{' '}
				{!mostCommonContractType
					? "Pas d'information"
					: ContractMappingFromContractTypeToUsers[mostCommonContractType]}
			</p>
			<p className="stats__description">
				<b>Type d'emploi le plus courant :</b>{' '}
				{!mostCommonJobTitle
					? "Pas d'information"
					: JobMappingFromJobTypeToUsers[mostCommonJobTitle]}
			</p>
			{!offersPerCity ? (
				<p>Pas d'information</p>
			) : (
				<table className="stats__offers">
					<caption className="stats__offers__caption">Répartition des offres par ville</caption>
					<thead>
						<tr className="stats__offers__thead__tr">
							<th className="stats__offers__thead__tr__th">Ville</th>
							<th className="stats__offers__thead__tr__th">Nombre d'offres</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(offersPerCity)
							.sort(([city1], [city2]) => city1.localeCompare(city2))
							.map(([city, count]) => (
								<tr key={city} className="stats__offers__tbody__tr">
									<td className="stats__offers__tbody__tr__td">{city}</td>
									<td className="stats__offers__tbody__tr__td">{count}</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</main>
	);
}

export default Statistics;
