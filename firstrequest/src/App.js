import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

function App() {
	const url = "https://course-api.com/react-tours-project";

	const [tours, setTours] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchTours = async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			if (!response.ok) throw Error("can't resolve");
			const data = await response.json();
			setLoading(false);
			setTours(data);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const removeTour = (id) => {
		const newTours = tours.filter((tours) => id !== tours.id);
		setTours(newTours);
	};
	if (tours.length === 0) {
		return (
			<main>
				<p> Tours list empty</p>
				<button onClick={() => fetchTours()}> Reset Tours</button>
			</main>
		);
	}

	return (
		<main className="App">
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	);
}

export default App;
