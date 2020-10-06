import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <div className='modalContainer'>
                <div className='modalBox'>
                    {this.props.children}
                </div>
            </div>,
            document.body
        );
    }
}