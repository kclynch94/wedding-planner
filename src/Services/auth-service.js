import config from '../config';

const storeToken = (token, user_email) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user_email', user_email)
}

const getToken = () => {
    return {
        token: localStorage.getItem('token'),
        user_email: localStorage.getItem('user_email')
    }
}

const deleteToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_email')
}

const getCurrentUser = () => {
    fetch(`${config.API_ENDPOINT}/users/current-user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        },
        body: JSON.stringify({'token': getToken().token})
       })
       .then(function(userRes) {
        if (!userRes.ok) {
          return userRes.json().then(e => Promise.reject(e))
        }
        return userRes.json()
      }).then((user) => {
      if(user.user_email) {
        console.log('Set User') 
        this.setState({
          currentUser: user
        })
      }})
}


export {storeToken, getToken, deleteToken, getCurrentUser};