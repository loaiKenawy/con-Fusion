import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle,
    Media
} from 'reactstrap';
class DishDetailComponent extends Component {

    renderComments(dish) {

        const dishComments = dish.comments.map((comment) => {
            return (
                <div key={comment.id} >

                    <Media >
                        <p>{comment.comment}</p>
                        <p>-{comment.author}</p>
                        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                    </Media>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="col-12 col-md-5 m-1">
                    <h1>Comments</h1>
                    <Media list>
                        {dishComments}
                    </Media>
                </div>
            </div>

        );
    }

    render() {
        var dish = this.props.dish
        if (dish != null)
            return (
                <div className='container'>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1" >
                            {this.renderComments(dish)}
                        </div>
                    </div>
                </div>
            );
        else {
            console.log("DISH DET : ");
            console.log(this.props.selectedDish);
        }

    }


}
export default DishDetailComponent;