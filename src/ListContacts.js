import React,{Component} from 'react'
import PropTypes from 'prop-types'
import escapeRedExp from 'escape-string-regexp'
import sortBy from 'sort-by'
//Stateless functional component and do not need to import {Component} from 'react'

/*function ListContacts(props){
    return (
        <ol className="contact-list">
            {props.contacts.map((contact) => (
                <li key={contact.id} className="contact-list-item">
                    <div className="contact-avatar" style={{
                        backgroundImage:`url(${contact.avatarURL})`
                    }}/>
                    <div className="contact-details">
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                    </div>
                    <button className="contact-remove" onClick={()=>props.onDeleteContact(contact)}>Remove</button>
                </li>
            ))}
        </ol>
    )
}

ListContacts.propTypes={
    contacts:PropTypes.array.isRequired,
    onDeleteContact:PropTypes.func.isRequired
}*/


class ListContacts extends Component{
    static propTypes={
        contacts:PropTypes.array.isRequired,
        onDeleteContact:PropTypes.func.isRequired
    }

    state ={
        query:''
    }

    clearQuery = ()=>{
        this.setState({query:''})
    }

    updateQuery = (query)=>{
        this.setState({query:query.trim()})
    }
    render() {
        // noinspection JSAnnotator
        const {contacts, onDeleteContact} = this.props
        const {query} = this.state

        let showingContacts
        if(query){
            const match = new RegExp(escapeRedExp(this.state.query),'i')
            showingContacts = contacts.filter((contact)=>match.test(contact.name))
        }else{
            showingContacts =  contacts
        }

        showingContacts.sort(sortBy('name'))
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts"
                            placeholder="search contact"
                            type="text"
                            value={this.state.query}
                            onChange={(event)=> this.updateQuery(event.target.value)}
                    />
                </div>
                {showingContacts.length!== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className="contact-list">
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className="contact-list-item">
                            <div className="contact-avatar" style={{
                                backgroundImage:`url(${contact.avatarURL})`
                            }}/>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={()=>onDeleteContact(contact)} className="contact-remove">Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts