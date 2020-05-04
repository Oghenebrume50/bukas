import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = '/api/v1/users';
    const { username, email, password, password_confirmation } = this.state;

    if (username.length == 0 || email.length == 0 || password.length == 0 || 
      password_confirmation.length == 0)
      return;

    const body = {
      username,
      email,
      password,
      password_confirmation
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(response => console.log('yoo vava na '+ response))
    .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-12 col-lg-6 offset-lg-3'>
            <h1 className='font-weight-normal mb-5'>
              Create a new User
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='username'>username</label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='form-control'
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className='form-control'
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='form-control'
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password_confirmation'>Password_confirmation</label>
                <input
                  type='password'
                  name='password_confirmation'
                  id='password_confirmation'
                  className='form-control'
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type='submit' className='btn custom-button mt-3'>
                SignUp
              </button>
              <Link to='/recipes' className='btn btn-link mt-3'>
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default SignUp;