import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './todolist.css';
import store from './store';
import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
} from './store/types';
import {
  getInputChangeAction,
  getAddTodoItemAction,
  getDeleteTodoItemAction,
  initListAction,
  getListAction,
  getInitListAction
} from './store/actionCreators';

class TodoList extends Component {
  constructor (props) {
    super (props);
    // this.state = {
    //   inputValue: '',
    //   list: [],
    //   show: true
    // }

    this.handlerInputChange = this.handlerInputChange.bind (this);
    this.handlerBtnClick = this.handlerBtnClick.bind (this);
    this.handlerItemDelete = this.handlerItemDelete.bind (this);
    this.handlerToggle = this.handlerToggle.bind (this);
    this.handerStoreChange = this.handerStoreChange.bind (this);

    this.state = store.getState ();
    store.subscribe (this.handerStoreChange);
  }

  componentWillMount () {
    console.log ('componentWillMount');
  }

  render () {
    console.log ('render');
    return (
      <Fragment>
        <CSSTransition
          in={this.state.show}
          timeout={300}
          classNames="star"
          unmountOnExit
          onEntered={el => {
            el.style.color = 'blue';
          }}
        >
          <div>toggle</div>
        </CSSTransition>
        <button onClick={this.handlerToggle}>Toggle</button>
        <div>
          {/* 不建议使用ref */}
          <input
            value={this.state.inputValue}
            onChange={this.handlerInputChange}
            ref={input => {
              this.input = input;
            }}
          />
          <button onClick={this.handlerBtnClick}>
            提交
          </button>
        </div>
        <ul
          ref={ul => {
            this.ul = ul;
          }}
        >
          {this.getTodoItem ()}
        </ul>
      </Fragment>
    );
  }

  //Ajax请求放在这里
  componentDidMount () {
    // Axios.get (
    //   'http://www.mocky.io/v2/5be2be742f00001000ca20b8'
    // ).then (resp => {
    //   // this.setState (() => ({
    //   //   list: [...resp.data],
    //   // }));
    //   store.dispatch (initListAction (resp.data));
    // });
    store.dispatch(getInitListAction());
  }

  shouldComponentUpdate () {
    console.log ('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate () {
    console.log ('componentWillUpdate');
  }

  componentDidUpdate () {
    console.log ('componentDidUpdate');
  }

  componentWillUnmount () {
    console.log ('componentWillUnmount');
  }

  getTodoItem () {
    return (
      <TransitionGroup>
        {this.state.list.map ((item, index) => {
          // return <li key={index} onClick={this.handlerItemDelete.bind(this)}
          // dangerouslySetInnerHTML={{__html:item}}></li>
          return (
            <CSSTransition
              timeout={300}
              classNames="star"
              unmountOnExit
              key={index}
              onEntered={el => {
                el.style.color = 'blue';
              }}
            >
              <TodoItem
                content={item}
                index={index}
                removeItem={this.handlerItemDelete}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }

  handlerInputChange (e) {
    // const inputValue = this.input.value;
    // this.setState(() => ({inputValue}));
    // const action = {
    //   type: CHANGE_INPUT_VALUE,
    //   inputValue: this.input.value,
    // };

    store.dispatch (getInputChangeAction (this.input.value));
  }

  // this.setState({ 	inputValue: e.target.value });}

  handlerBtnClick () {
    // this.setState (
    //   prevState => ({
    //     list: [...prevState.list, prevState.inputValue],
    //     inputValue: '',
    //   }),
    //   () => {
    //     console.log (this.ul.querySelectorAll ('div').length);
    //   }
    // );
    // const action = {
    //   type: ADD_TODO_ITEM,
    //   inputValue: this.input.value,
    // };

    store.dispatch (getAddTodoItemAction (this.input.value));
  }

  // this.setState({ 	list: [...this.state.list, this.state.inputValue],
  // 	inputValue: '' });}

  handlerItemDelete (index) {
    // this.setState (prevState => {
    //   const list = [...prevState.list];
    //   list.splice (index, 1);
    //   return {list};
    // });
    // const action = {
    //   type: DELETE_TODO_ITEM,
    //   index: index,
    // };

    store.dispatch (getDeleteTodoItemAction (index));
  }

  handlerToggle () {
    this.setState (() => {
      return {
        show: this.state.show ? false : true,
      };
    });
  }

  handerStoreChange () {
    this.setState (() => store.getState ());
  }
}

export default TodoList;
