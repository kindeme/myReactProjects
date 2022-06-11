import "./App.css";
import { useState, useEffect } from "react";

import List from "./List";

const getLocalStorage = () => {
	let list = localStorage.getItem("groceryList");
	if (list) {
		return (list = JSON.parse(localStorage.getItem("groceryList")));
	} else {
		return [];
	}
};

function App() {
	const [grocery, setGrocery] = useState("");
	const [amount, setAmount] = useState("");
	const [list, setList] = useState(getLocalStorage());
	const [isEdit, setIsEdit] = useState(false);
	const [alert, setAlert] = useState("");
	const [editID, setEditID] = useState(null);
	const [isShowAlert, isSetShowAlert] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!grocery || !amount) {
			setTimeout(() => {
				isSetShowAlert(true);
				setAlert("Please enter a valid input");
			}, 3000);
		} else if (grocery && amount && isEdit) {
			setList(
				list.map((item) => {
					if (item.id === editID) {
						return { ...item, name: grocery, price: amount };
					}
					return item;
				})
			);
			setGrocery("");
			setAmount("");
			setEditID(null);
			setIsEdit(false);
		} else {
			const newGrocery = {
				id: new Date().getTime().toString(),
				name: grocery,
				price: amount,
			};
			setList([...list, newGrocery]);
			setAmount("");
			setGrocery("");
		}
	};

	const removeItem = (id) => {
		const newList = list.filter((item) => item.id !== id);
		setList(newList);
	};
	useEffect(() => {
		localStorage.setItem("groceryList", JSON.stringify(list));
	}, [list]);

	const editItem = (id) => {
		const editGrocery = list.find((item) => item.id === id);
		setIsEdit(true);
		setEditID(id);
		setGrocery(editGrocery.name);
		setAmount(editGrocery.price);
	};

	return (
		<div className="App">
			<h1> Expense Track</h1>
			<form className="form" onSubmit={handleSubmit}>
				{isShowAlert && <p className="alert">{alert}</p>}
				<div className="form-control">
					<input
						type="text"
						name="grocery"
						value={grocery}
						onChange={(e) => setGrocery(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<input
						type="text"
						name="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>

				<button type="submit" className="btn-submit">
					{isEdit ? "Edit" : "Add"}
				</button>
			</form>
			<List list={list} removeItem={removeItem} editItem={editItem} />
		</div>
	);
}

export default App;
