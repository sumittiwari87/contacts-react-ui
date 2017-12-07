import React, { Component } from 'react'
import ListContacts from './ListContacts'
import {Route} from 'react-router-dom'
import * as ContactAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'


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

    createContact =(contact)=>{
        ContactAPI.create(contact).then((contact)=>{
            this.setState((state)=>({
                contacts: this.state.contacts.concat([contact])
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
      <div className="app">
          <Route exact path ="/" render = {()=>(
              <ListContacts
                  contacts={this.state.contacts}
                  onDeleteContact={this.removeContact}

              />
          )}/>
          <Route path ="/create" render={({history})=>(
              <CreateContact
                  onCreateContact ={(contact)=>{
                      this.createContact(contact)
                      history.push("/")
                  }}
              />
              )}/>
      </div>
    )
  }
}

export default App;
