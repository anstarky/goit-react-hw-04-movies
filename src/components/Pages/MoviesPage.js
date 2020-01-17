import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';
import queryString from 'query-string';

import api from '../Services/api';
import style from './MoviesPage.module.css';

export default class MoviesPage extends Component {
  static propTypes = {
    location: T.instanceOf(Object).isRequired,
    history: T.instanceOf(Object).isRequired,
  };

  state = {
    movies: null,
    query: '',
  };

  componentDidMount() {
    const { location } = this.props;

    if (!location.search) {
      return;
    }

    const queryObject = queryString.parse(location.search);
    this.fetchSearchMovies(queryObject.query);
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.fetchSearchMovies(this.state.query);
    const { location, history } = this.props;

    history.replace({
      pathname: location.pathname,
      search: `?query=${this.state.query}`,
    });

    this.setState({ query: '' });
  };

  fetchSearchMovies = async query => {
    const searchMovies = await api.searchMovies(query);
    this.setState({ movies: searchMovies });
  };

  render() {
    const { query, movies } = this.state;
    const { location } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className={style.search_form}>
          <input type="text" value={query} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>

        {movies && (
          <ul>
            {movies.map(move => (
              <li key={move.id}>
                <Link
                  to={{
                    pathname: `/movies/${move.id}`,
                    state: { from: location },
                  }}
                >
                  {move.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
