import {getToken} from './auth-service';
import config from '../config';

const getData = () => {
    return Promise.all([
        fetch(`${config.API_ENDPOINT}/users`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          }
        }),
        fetch(`${config.API_ENDPOINT}/venues`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': getToken().token,
            'user_email': getToken().user_email
          }
        }),
        fetch(`${config.API_ENDPOINT}/caterers`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': getToken().token,
            'user_email': getToken().user_email
          }
        }),
        fetch(`${config.API_ENDPOINT}/photographers`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': getToken().token,
            'user_email': getToken().user_email
          }
        }),
        fetch(`${config.API_ENDPOINT}/florists`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': getToken().token,
            'user_email': getToken().user_email
          }
        }),
        fetch(`${config.API_ENDPOINT}/guests`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': getToken().token,
            'user_email': getToken().user_email
          }
        })
      ])
        .then(([usersRes, venuesRes, caterersRes, photographersRes, floristsRes, guestsRes]) => {
          if (!usersRes.ok)
            return usersRes.json().then(e => Promise.reject(e))
          if (!venuesRes.ok)
            return venuesRes.json().then(e => Promise.reject(e))
          if (!caterersRes.ok)
            return caterersRes.json().then(e => Promise.reject(e))
          if (!photographersRes.ok)
            return photographersRes.json().then(e => Promise.reject(e))
          if (!floristsRes.ok)
            return floristsRes.json().then(e => Promise.reject(e))
          if (!guestsRes.ok)
            return guestsRes.json().then(e => Promise.reject(e))
          
          return Promise.all([
            usersRes.json(),
            venuesRes.json(),
            caterersRes.json(),
            photographersRes.json(),
            floristsRes.json(),
            guestsRes.json(),
          ])
        })
}

export {getData};