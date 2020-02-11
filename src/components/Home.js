import React from 'react';
import '../styles/Home.css';
import { Tabs, Button } from 'antd';
import {API_ROOT, AUTH_HEADER, GEOLOCATION_OPTIONS, POSITION_KEY, TOKEN_KEY} from '../constants';
const { TabPane } = Tabs;

export class Home extends React.Component {
  state = {
    loadingGeolocation: false,
    loadingPosts: false,
    errorMessage: null,
  }

  getGeolocation() {
    this.setState({
      loadingGeolocation: true,
      errorMessage: null,
    });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
          this.onGeolocationSuccess,
          this.onGeolocationFailure,
          GEOLOCATION_OPTIONS,
      );
    } else {
      this.setState({
        loadingGeolocation: false,
        errorMessage: 'Your browser does not support geolocation',
      });
    }
  }

  onGeolocationSuccess = (position) => {
    this.setState({
      loadingGeolocation: true,
      errorMessage: null,
    });
    console.log(position);
    const {latitude, longitude} = position.coords;
    localStorage.setItem(POSITION_KEY, JSON.stringify({latitude, longitude}));
    this.loadNearbyPost();
  }

  onGeolocationFailure = () => {
    this.setState({
      loadingGeolocation: false,
      errorMessage: 'Failed to load geolocation',
    });
  }

  loadNearbyPost() {
    this.setState({
      loadingPosts: true,
      errorMessage: null,
    });

    const   position = JSON.parse(localStorage.getItem(POSITION_KEY));
    const  range = 20;
    const token = localStorage.getItem(TOKEN_KEY);

    fetch(`${API_ROOT}/search?lat=${position.latitude}&lon=${position.longitude}&range=${range}`, {
      method: 'GET',
      headers: {
        Authorization: `${AUTH_HEADER} ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to load posts');
    }).then((data) => {
        console.log(data);
        this.setState({
          loadingPosts: false,
          posts: data ? data : [],
        })
    }).catch((error) => {
      this.setState({
        loadingPosts: false,
        errorMessage: error.message,
      })
    })

  }

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    const operations = <Button>Creat New Post</Button>;
    return (
        <Tabs tabBarExtraContent={operations} className="main-tabs">
          <TabPane tab="Images Posts" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="Video Posts" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="Maps" key="3">
            Content of tab 3
          </TabPane>
        </Tabs>
    );
  }
}



