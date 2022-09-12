import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetailComponent from './DishDetailComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }
  render() {
    //at line 32 passing the dish object to th DishDetailComponent
    return (
      <div >
        <Navbar dark color="primary"
        >
          <div className="container">
            <NavbarBrand href='/' color=''>
              Ristorante Con Fusion
            </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} 
        onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetailComponent dish={this.state.dishes.filter((_dish) => _dish.id === this.state.selectedDish)[0]}/>
      </div>
    );
  }
}



export default Main;
