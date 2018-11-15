import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }

    //优化性能：阻止父组件render函数重新执行后子组件render函数也执行
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.content !== this.props.content) {
            return true;
        }
        return false;
    }

    //首先从父组件接受props参数
    //其次父组件render函数被重新执行后触发此生命周期
    componentWillReceiveProps() {
        console.log('child componentWillReceiveProps');
    }

    render() {
        const { content, test } = this.props;
        return (
            <Fragment>
                <div onClick={this.handlerClick}>{test} - {content}</div>
            </Fragment>
        )
    }

    componentWillUnmount() {
        console.log('child componentWillUnmount');
    }

    handlerClick() {
        const { removeItem, index } = this.props;
        removeItem(index);
    }

}

TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    removeItem: PropTypes.func,
    index: PropTypes.number,
}

TodoItem.defaultProps = {
    test: 'Hello World',
}

export default TodoItem;