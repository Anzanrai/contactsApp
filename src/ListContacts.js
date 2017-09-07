import React from 'react';
import PropTypes from 'prop-types';

export default class ListContancts extends React.Component{
  render(){
    let {contacts} = this.props;
    return <ol className='contact-list'>
      {
        contacts.map((contact, index)=>{
          return <li key={index} className='contact-list-item'>
            <div className="contact-avatar" style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={this.props.removeContact(contact)}className="contact-remove" />
          </li>
        })
      }
    </ol>
  }
}

ListContancts.propTypes = {
  contacts: PropTypes.array.isRequired,
  removeContact: PropTypes.func.isRequired,
}