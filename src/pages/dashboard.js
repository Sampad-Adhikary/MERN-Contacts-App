import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Greet from "../components/greet";
import Footer from "../components/footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [tempContact, setTempContact] = useState({
    name: "",
    contactNumber: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [editedContact, setEditedContact] = useState({
    name: "",
    contactNumber: "",
  });

  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function populateContacts() {
    const token = localStorage.getItem("token");
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    const userName = payload.name;

    if (token) {
      const req = await fetch(
        "https://wandering-bracelet-dove.cyclic.app/api/contacts",
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const data = await req.json();
      if (data.status === "ok") {
        setName(userName.toUpperCase());
        setContacts(data.contacts);
      } else {
        alert(data.error);
      }
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    populateContacts();
  }, []);

  async function addContact(event) {
    event.preventDefault();
    if (tempContact.contactNumber.length !== 10) {
      alert("Contact number must have exactly 10 digits.");
      return;
    }

    const contactData = {
      name: tempContact.name,
      contactNumber: tempContact.contactNumber,
    };

    const req = await fetch(
      "https://wandering-bracelet-dove.cyclic.app/api/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          contact: contactData,
        }),
      }
    );

    const data = await req.json();
    if (data.status === "ok") {
      setContacts(data.contacts);
      setTempContact({
        name: "",
        contactNumber: "",
      });
    } else {
      alert(data.error);
    }
  }

  async function updateContact(event) {
    event.preventDefault();
    if (editedContact.contactNumber.length !== 10) {
      alert("Contact number must have exactly 10 digits.");
      return;
    }

    const contactData = {
      name: editedContact.name,
      contactNumber: editedContact.contactNumber,
    };

    const req = await fetch(
      `https://wandering-bracelet-dove.cyclic.app/api/contacts/${editingContact}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          contact: contactData,
        }),
      }
    );

    const data = await req.json();
    if (data.status === "ok") {
      const updatedContacts = contacts.map((contact) => {
        if (contact._id === editingContact) {
          return {
            ...contact,
            name: editedContact.name,
            contactNumber: editedContact.contactNumber,
          };
        }
        return contact;
      });
      setContacts(updatedContacts);
      setEditingContact(null);
      setEditedContact({
        name: "",
        contactNumber: "",
      });
    } else {
      alert(data.error);
    }
  }

  async function deleteContact(contactId) {
    const req = await fetch(
      `https://wandering-bracelet-dove.cyclic.app/api/contacts/${contactId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await req.json();
    if (data.status === "ok") {
      setContacts(data.contacts);
    } else {
      alert(data.error);
    }
  }

  function editContact(contactId) {
    const contact = contacts.find((contact) => contact._id === contactId);
    setEditingContact(contactId);
    setEditedContact({
      name: contact.name,
      contactNumber: contact.contactNumber,
    });
  }

  return (
    <div className="row">
      <div className="col-list col-lg-6 col-md-6 col-sm-12">
        <h1 className="headingBig">Your Contacts app</h1>
        {contacts.length > 0 ? (
          <ul className="contactList">
            {contacts.map((contact) => (
              <li key={contact._id}>
                {editingContact === contact._id ? (
                  <div className="contactListDiv">
                    <input
                      className="editFrm"
                      type="text"
                      value={editedContact.name}
                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          name: e.target.value,
                        })
                      }
                    />
                    <br/>
                    <input
                      className="editFrm"
                      type="number"
                      value={editedContact.contactNumber}
                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                    <br/>
                    <button className="clistBtn" onClick={updateContact}>Update</button>
                    <button className="clistBtn"
                      onClick={() => {
                        setEditingContact(null);
                        setEditedContact({
                          name: "",
                          contactNumber: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="contactListDiv">
                    <div className="row">
                    <div className="col-avatar col-6">
                      <img className="avatar" src="./resources/avatar.gif" alt="avtar"/>
                    </div>
                    <div className="col-6">
                      <div className="clistItem">{contact.name}</div>
                      <div className="clistItem">{contact.contactNumber}</div>
                      <button className="clistBtn" onClick={() => editContact(contact._id)}>
                      edit
                      </button>
                      <button className="clistBtn" onClick={() => deleteContact(contact._id)}>
                      delete
                      </button>
                    </div>
                  </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="notFound">
            <img src="./resources/nothing.gif"/>
            <h3>😅 Add some contacts, Maybe..</h3>
          </div>
        )}
      </div>
      <div className="col-edit col-lg-6 col-md-6 col-sm-12">
        <div className="editBox">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="greeting">
                <Greet />
                <h1>{name} 👋</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <button id="logoutBtn" onClick={logout}>Logout</button>
            </div>
          </div>
        <div className="formBox" id="editForm">
          <form onSubmit={addContact}>
            <input
              className="registerInput" id="editInput"
              type="text"
              placeholder="Name"
              value={tempContact.name}
              onChange={(e) =>
                setTempContact({ ...tempContact, name: e.target.value })
              }
              required
            /><br/>
            <input
              className="registerInput" id="editInput"
              type="number"
              placeholder="Contact Number"
              value={tempContact.contactNumber}
              onChange={(e) =>
                setTempContact({
                  ...tempContact,
                  contactNumber: e.target.value,
                })
              }
              required
            />
            <br/>
            <button id="editbtn" className="registerButton" type="submit">Add Contact</button>
          </form>
          
        </div>
        <Footer/>
      </div>
    </div>
    </div>
  );
}
