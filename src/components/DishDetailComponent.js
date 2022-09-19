import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle,
    Media, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

class DishDetailComponent extends Component {

    renderComments(comments) {

        const dishComments = comments.map((comment) => {
            return (
                <div >
                    <p className='comments-font'>{comment.comment}</p>
                    <p className='author-font'>-{comment.author}</p>
                    <p className='author-font'>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                </div>
            );
        });
        return (
            <div className="container">
                <h1>Comments</h1>
                <Media list>
                    {dishComments}
                </Media>
            </div>

        );
    }

    render() {
        var dish = this.props.dish
        if (dish != null)
            return (
                <div className='container'>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
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
                            {this.renderComments(this.props.comments)}
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