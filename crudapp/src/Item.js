import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Item = ({ id, name, price, removeItem, editItem }) => {
	return (
		<div className="item">
			<div className="item-info">
				<p>{name}</p>
				<p>${price}</p>
			</div>
			<div className="item-icons">
				<button>
					<FaEdit className="btn-edit" onClick={() => editItem(id)} />
				</button>
				<button onClick={() => removeItem(id)}>
					<MdDelete className="btn-delete" />
				</button>
			</div>
		</div>
	);
};

export default Item;
