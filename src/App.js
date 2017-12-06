import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactAPI from './utils/ContactsAPI'


class App extends Component {
  state ={
      contacts : []
  }

  removeContact =(contact)=>{
       ContactAPI.remove(contact).then((contact)=>{
           this.setState((state)=>({
               contacts:state.contacts.filter((c)=>c.id!==contact.id)
           }))
       })
    }

  componentDidMount(){
        ContactAPI.getAll().then((contacts)=>{
            this.setState({contacts})
        })
    }

  render() {
    return (
      <div>
        <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
        />
      </div>
    )
  }
}

export default App;
