import React, { useEffect, useState } from 'react';

function PresentationForm() {
  const [conferences, setConferences] = useState([])

  //Notice that we can condense all formData
  //into one state object
  const [formData, setFormData] = useState({
    presenter_name: '',
    presenter_email: '',
    company_name: '',
    title: '',
    synopsis: '',
    conference: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);

    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://localhost:8000${formData.conference}presentations/`;

    const fetchConfig = {
      method: "post",
      //Because we are using one formData state object,
      //we can now pass it directly into our request!
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      //The single formData object
      //also allows for easier clearing of data
      setFormData({
        presenter_name: '',
        presenter_email: '',
        company_name: '',
        title: '',
        synopsis: '',
        conference: '',
      });
    }
  }

  //Notice that we can also replace multiple form change
  //eventListener functions with one
  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    //We can condense our form data event handling
    //into on function by using the input name to update it

    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,

      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleFormChange} id="synopsis" rows="3" name="synopsis" className="form-control"></textarea>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} required name="conference" id="conference" className="form-select">
                  <option value="">Choose a conference</option>
                  {conferences.map(conference => {
                  return (
                    <option key={conference.href} value={conference.href}>{conference.name}</option>
                  )
                })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentationForm;
