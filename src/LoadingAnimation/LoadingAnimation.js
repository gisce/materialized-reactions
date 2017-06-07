import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    'page': {
        textAlign: 'center',
        marginTop: 50,
        width: '100%',
    }
};

class LoadingAnimation extends Component {
    render() {
        return  (

            <div style={styles.page}>
                <h3>Loading...</h3>
                <br/>
                <CircularProgress size={80} thickness={5} />
            </div>

        );
    }
}

LoadingAnimation.propTypes = {
};

export default LoadingAnimation;
