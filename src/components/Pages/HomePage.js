import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../Services/api';
import style from './HomePage.module.css';

export default class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    this.fecthTrendingMovies();
  }

  fecthTrendingMovies = async () => {
    const movies = await api.getTrendingMovies();
    this.setState({ movies });
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1 className={style.title}>Trending today</h1>
        <ul>
          {movies.map(move => (
            <li key={move.id}>
              <Link to={`/movies/${move.id}`}>{move.title || move.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
