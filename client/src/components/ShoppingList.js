import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      modal: false,
      name: '',
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/items')
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log('error in fetching items');
      });
  }

  deleteExercise = (id) => {
    axios
      .delete('http://localhost:5000/api/items/' + id)
      .then((res) => console.log(res.data));

    this.setState({
      items: this.state.items.filter((item) => item._id !== id),
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      name: this.state.name,
    };
    axios.post('http://localhost:5000/api/items/', newItem).then((res) =>
      this.setState((state) => ({
        items: [...state.items, newItem],
      }))
    );

    this.toggle();
  };

  render() {
    const { items } = this.state;
    // console.log(items);
    return (
      <Container>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            this.toggle();
          }}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add new item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <label for='item'>Item</label>

                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add Shopping item'
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
            <Button
              color='dark'
              onClick={this.toggle}
              style={{ marginTop: '2 rem' }}
              block
            >
              Add Item
            </Button>
          </ModalBody>
        </Modal>

        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    size='sm'
                    color='danger'
                    onClick={() => {
                      this.deleteExercise(_id);
                    }}
                  >
                    &times;
                  </Button>

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ShoppingList;
