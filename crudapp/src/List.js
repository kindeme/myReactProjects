import React from "react";
import Item from "./Item";

const List = ({ list, removeItem, editItem }) => {
	return (
		<article className="article">
			{list.map((item) => {
				return (
					<Item
						key={item.id}
						{...item}
						removeItem={removeItem}
						editItem={editItem}
					/>
				);
			})}
		</article>
	);
};
export default List;
