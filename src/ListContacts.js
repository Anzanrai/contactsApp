import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class ListContancts extends React.Component{
  state = {
    query: ''
  }

  onChange=(event)=>{
    this.setState({
      query: event.target.value.trim()
    })
  }

  resetQuery=()=>{
    this.setState({
      query: ''
    })
  }

  render(){
    let {contacts} = this.props;
    let filteredContacts = [];
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      filteredContacts = contacts.filter((contact)=> match.test(contact.name))
    } else {
      filteredContacts = contacts
    }

    filteredContacts.sort(sortBy('name'));
    return <div className='list-contacts'>
      <div className='list-contacts-top'>
        <input 
          className='search-contacts'
          type='text'
          placeholder='Search Contacts'
          value={this.state.query}
          onChange={this.onChange}
        />
      </div>
      { filteredContacts.length !== contacts.length && <div className="showing-contacts">
          <span>Now Showing {filteredContacts.length} of {contacts.length}.</span>
          <button onClick={this.resetQuery}>Show all</button>
        </div>
      } 

      <ol className='contact-list'>
        {
          filteredContacts.map((contact, index)=>{
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
    </div>
  }
}

ListContancts.propTypes = {
  contacts: PropTypes.array.isRequired,
  removeContact: PropTypes.func.isRequired,
}