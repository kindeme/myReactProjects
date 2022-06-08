import React from "react";

const Tour = ({ id, name, info, image, price, removeTour }) => {
	return (
		<article className="card">
			<img src={image} className="card-img" alt="card-img" />
			<h3 className="title">{name}</h3>
			<h3 className="price">{price}</h3>
			<p className="text">{info}</p>
			<button onClick={() => removeTour(id)}> Not interested</button>
		</article>
	);
};

export default Tour;
