import Header from './components/Header';
import { Route, Routes } from 'react-router';
import Jobs from './pages/Jobs';
import Statistics from './pages/Statistics';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/jobs" element={<Jobs />} />
				<Route path="/statistics" element={<Statistics />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</>
	);
}

export default App;
