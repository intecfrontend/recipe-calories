//see line 13 + 1 number after the ,

import React, { useEffect, useState } from "react";

import Recipe from "./Recipe";
import kook from "./imgs/KOOKBOEK.jpg";
import stain from "./imgs/stain.png";
import "./App.css";
import "./myStyles.css";

const App = () => {
  const APP_ID = "12e3bacd";
  const APP_Key = "9ede987946f451e821401a575e67980a";
  const [recipes, setRecipes] = useState([]);
  const [foodDb, setFoodDb] = useState([]);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("100");
  const [max, setMax] = useState("2000");
  const [query, setQuery] = useState("");
  useEffect(() => {
    getRecipes();
  }, [query]);
  useEffect(() => {
    getFoodDb();
  }, [foodDb]);
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&calories=${min}-${max}&app_id=${APP_ID}&app_key=${APP_Key}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setRecipes(
      data.hits.filter(
        item => item.recipe.calories >= min && item.recipe.calories <= max
      )
    );
    console.log(data.hits);
  };
  const getFoodDb = async () => {
    const response2 = await fetch(
      `https://api.edamam.com/api/food-database/parser?ingr=${foodDb}&calories=${min}-${max}&app_id=22e0b28d&app_key=2d0fab079a5062397794f9dc28850cc3`
    );
    const data2 = await response2.json();
    //setRecipes(data2.hits);
    console.log(data2);
  };
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const updateMin = e => {
    setMin(e.target.value);
  };
  const updateMax = e => {
    setMax(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    alert("reciepe");
  };

  const getSearch2 = e => {
    e.preventDefault();
    setFoodDb(search);
    setSearch("");
    alert("calorie = " + search);
  };
  return (
    <div className="App">
      <form className="search-form">
        <div className="body">
          <img className="bg" src={kook} alt="bg-img" />
          <div className="stainwrapper">
            <img className="stainbg" src={stain} alt="bg-img" />
            <img className="stainbg" src={stain} alt="bg-img" />
            <img className="stainbg" src={stain} alt="bg-img" />
          </div>
        </div>

        <div className="bg-text">
          The Coders <div className="st-text"> food for the brain ...</div>
          Cookbook
        </div>

        <div>
          <div className="inputcontainer">
            <div>
              <input
                placeholder="Type here what would you like to eat."
                type="text"
                className="whatinput"
                value={search}
                onChange={updateSearch}
              />
            </div>

            <div className="inputwrapper">
              <input
                placeholder="Minimum amount of calories"
                type="number"
                value={min}
                onChange={updateMin}
                id="left"
                className="whatmininput"
              />
              <input
                placeholder="And your maximum is..."
                type="number"
                value={max}
                onChange={updateMax}
                placeholder="100calories"
                id="right"
                className="whatmininput ordershad"
              />
            </div>
            <input
              onClick={getSearch}
              type="submit"
              placeholder="recipe"
              className="order ordershad"
            />
          </div>
        </div>
        <div className="reccont">
          {recipes.map(recipe => (
            <Recipe
              key={Math.random()}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </form>
      {/*       



        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <input type="text" value={min} onChange={updateMin} />
        <input type="text" value={max} onChange={updateMax} />
        <button className="search-button" onClick={getSearch}>
          recipe
        </button>

        <button className="cal-button" onClick={getSearch2}>
          calories
        </button>
        
      </form> */}
    </div>
  );
};
export default App;
