import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import T from 'prop-types';

import MovieCastPage from './MovieCastPage';
import MovieReviewsPage from './MovieReviewsPage';

import routes from '../../routes';
import api from '../Services/api';

import style from './MovieDetailsPage.module.css';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    match: T.instanceOf(Object).isRequired,
    location: T.instanceOf(Object).isRequired,
    history: T.instanceOf(Object).isRequired,
  };

  state = {
    movie: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.getMovieDetail(match.params.moviesId);
  }

  getMovieDetail = async id => {
    const movie = await api.getMovieDetail(id);
    this.setState({ movie });
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    if (!location.state) {
      history.push('/');
      return;
    }

    history.push({
      pathname: '/movies',
      search: location.state.from.search,
    });
  };

  render() {
    const { match, location } = this.props;
    const { movie } = this.state;
    return (
      <div className={style.wrp_movie}>
        {movie && (
          <div className={style.wrp_about}>
            <button
              type="button"
              onClick={this.handleGoBack}
              className={style.btn_goback}
            >
              ← Go back
            </button>
            <div className={style.description}>
              <div className={style.image}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                  alt="poster"
                />
              </div>
              <div>
                <p className={style.title}>
                  {`${movie.original_title}  (${movie.release_date.slice(
                    0,
                    4,
                  )})`}
                </p>

                <p>User Score: {movie.vote_average * 10}%</p>
                <p className={style.title}>Overview</p>
                <p>{movie.overview}</p>
                <p className={style.title}>Genres</p>
                <div>
                  <p>
                    {movie.genres.map(index => (
                      <span key={index.id} className={style.genres}>
                        {index.name}
                        {'. '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={style.wrp_about}>
          <p className={style.txt_addinfo}>Additional information</p>
          <ul>
            <li>
              <Link
                to={{
                  pathname: `${match.url}/cast`,
                  state: location.state,
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `${match.url}/reviews`,
                  state: location.state,
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route exact path={routes.MOVIES_CAST} component={MovieCastPage} />
          <Route
            exact
            path={routes.MOVIES_REVIEWS}
            component={MovieReviewsPage}
          />
        </Switch>
      </div>
    );
  }
}
