import React, {Component} from 'react';
import nanoid from 'nanoid';

import Ingredient from './Components/Ingredients/Ingredients'
import ListItem from "./Components/ListItem/ListItem";

import  baconImage from './assets/bacon.jpeg';
import cheeseImage from './assets/cheese.jpg';
import meatImage from './assets/meat.jpg';
import saladImage from './assets/salad.jpg';

import './App.css';

const INGREDIENTS = [
    {name: 'Bacon', price: 30, image: baconImage},
    {name: 'Cheese', price: 20, image: cheeseImage},
    {name: 'Meat', price: 50, image: meatImage},
    {name: 'Salad', price: 5, image: saladImage},
];

class App extends Component {
    state = {
        ingredients:[
            {name: 'Bacon', count: 0},
            {name: 'Cheese', count: 0},
            {name: 'Meat', count: 0},
            {name: 'Salad', count: 0},
        ],
    };

    addIngredient = itemToAdd => {
        const ingredients = [...this.state.ingredients];

        const index = ingredients.findIndex(item => item.name === itemToAdd);

        const ingredient = ingredients[index];

        ingredient.count++;

        ingredients[index] = ingredient;

        this.setState({ingredients})
    };

    deleteIngredient = itemToDelete => {
        const ingredients = [...this.state.ingredients];

        const index = ingredients.findIndex(item => item.name === itemToDelete);

        const ingredient = ingredients[index];

        if(ingredient.count > 0){
            ingredient.count--;
        }

        ingredients[index] = ingredient;

        this.setState({ingredients})
    };

    getBurgerIngredients = () => {
        const ingredients = this.state.ingredients;

        const ingredientList = [];

        for(const ingredient of ingredients){
            for(let i = 0; i < ingredient.count; i++){
                ingredientList.push({name: ingredient.name});
            }
        }

        return ingredientList;
    };

    getTotal = () => {
        let totalPrice = 20;

        INGREDIENTS.forEach(ingredient =>
            {
                const price = ingredient.price;

                let itemPrice = 0;

                const count = this.state.ingredients.find(ing => ing.name === ingredient.name).count;

                if(count){
                    itemPrice = price * count;
                }

                totalPrice += itemPrice;
            }
        );

        return totalPrice;
    };

    render() {
        const list = INGREDIENTS.map(ingredient =>
            <ListItem
                key={nanoid()}
                name={ingredient.name}
                image={ingredient.image}
                count={this.state.ingredients.find(item => item.name === ingredient.name).count}
                add={() => this.addIngredient(ingredient.name)}
                delete={() => this.deleteIngredient(ingredient.name)}
            />);

        const ingredients = this.getBurgerIngredients().map(ingredient =>
            <Ingredient
                key={nanoid()}
                className={ingredient.name}
            />);

        return(
            <div className="App">
                <div className='window leftWindow'>
                    {list}
                </div>
                <div className='window rightWindow'>
                    <div className='Burger'>
                        <div className="BreadTop">
                            <div className="Seeds1"/>
                            <div className="Seeds2"/>
                        </div>
                        {ingredients}
                        <div className="BreadBottom"/>
                    </div>

                    {this.getTotal()}

                </div>
            </div>
        )
    }
}
export default App;
