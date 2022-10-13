import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button,
    Media, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label,
    Col, Row
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


function RenderComments({ comments, addComment, dishId }) {

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
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>

    );
}
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.Rating, values.Name, values.message);
        //event.preventDefault();
    }



    render() {
        return (
            <div className='container'>

                <Button outline onClick={this.toggleModal}><span className='fa fa-thin fa-pencil'></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor="Rating">Rating</Label>
                            <Col >
                                <Control.select model=".Rating" id="Rating" name="Rating"
                                    placeholder="Rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                            <Label htmlFor="Name" className="mx-auto my-2">Name</Label>
                            <Col >
                                <Control.text model=".Name" id="Name" name="Name"
                                    placeholder="Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".Name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                            <Label htmlFor="message" className="mx-auto my-2" >Comment</Label>
                            <Col >
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="12"
                                    className="form-control" />
                            </Col>

                            <Col className="mx-auto my-2">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </LocalForm>
                    </ModalBody>

                </Modal>
            </div >
        );

    }

}
class DishDetailComponent extends Component {
    constructor(props) {
        super(props);
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
                            <RenderComments comments={this.props.comments}
                                addComment={this.props.addComment}
                                dishId={this.props.dish.id}
                            />
                        </div>
                    </div>
                </div>
            );
        else {
            console.log("DISH DET : ");
            console.log(this.props.selectedDish);
        }

    }

    // {this.renderComments(this.props.comments,this.props.addComment, this.props.dish.id)}
    // {this.renderAddCommentForm()}
}
export default DishDetailComponent;