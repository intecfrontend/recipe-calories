import React from "react";
import "./app1.css";
//var my_float = 0.6666
//my_float.toFixed(3) # => 0.667

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className="recipecontainer" key={Math.random()}>
      <h3>{title}</h3>
      <ol>
        {ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p className="p">calories: {calories.toFixed(2)}</p>
      <img className="image" src={image} alt="foodimage" />
    </div>
  );
};
export default Recipe;
