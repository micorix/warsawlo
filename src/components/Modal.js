import React from 'react'
import styled from 'react-emotion'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMarker, faTimes} from '@fortawesome/free-solid-svg-icons'
const ModalWrapper = styled('div')`
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background: rgba(210,210,210,0.7);
  z-index: 100;
  display:block;
  justify-content:center;

  .modal{
    background:white;
    width:50%;
    margin: 20vh auto 0 auto;

    display:flex;
    position:relative;
    padding: 20px;
    & .modal-body{
      width:80%;
      h4{
        line-height:1.3em;
      }
    }
    & .modal-close{
      position: absolute;
      top:10px;
      right:10px;
      cursor:pointer;
      path{
       fill: rgb(100,100,100);
     }
    }
    & .modal-icon{
      width:20%;
      display:flex;
      align-items:center;
      justify-content:center;
      svg path{
        fill: rgb(100,100,100);
      }
    }
  }
`


class Modal extends React.Component {
  render () {
    if(this.props.open)
      return (
        <ModalWrapper onClick={this.props.onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
        <FontAwesomeIcon icon={faTimes} className="modal-close" onClick={this.props.onClose}/>
        <div className="modal-icon">
        <FontAwesomeIcon icon={this.props.icon} size="3x"/>
        </div>
        <div className="modal-body">
        {this.props.children}
        </div>
        </div>
        </ModalWrapper>
      )
    return null
  }
}

export default Modal;
