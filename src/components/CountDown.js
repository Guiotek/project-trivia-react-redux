import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOut } from '../Redux/Actions';

class CountDown extends Component {
  state = {
    timer: 3,
  };

  componentDidMount() {
    this.countDown();
  }

  countDown = () => {
    // const { time } = this.props;
    const { timer } = this.state;
    const timeLimit = 1000;
    console.log('aaa');
    return setInterval(() => {
      this.setState({
        timer: timer - 1,
      });
    }, timeLimit);

    // if (timer >= 1) {
    //   time();
    // }
  };

  render() {
    const { timer } = this.state;
    return (
      <div>
        <h3>
          { timer }
        </h3>
      </div>
    );
  }
}

CountDown.propTypes = {
  timeOut: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  time: () => dispatch(timeOut()),
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
