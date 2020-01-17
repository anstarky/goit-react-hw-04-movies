import React, { Component } from 'react';
import T from 'prop-types';

import api from '../Services/api';
import style from './MovieCastPage.module.css';

export default class MovieCastPage extends Component {
  static propTypes = {
    match: T.instanceOf(Object).isRequired,
  };

  state = {
    cast: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.fecthMovieCast(match.params.moviesId);
  }

  fecthMovieCast = async id => {
    const data = await api.getMovieCast(id);
    this.setState({ cast: data.cast });
  };

  render() {
    const { cast } = this.state;
    return (
      <div className={style.actors}>
        {cast &&
          cast.map(index => (
            <div key={index.id} className={style.actors_item}>
              <h3 className={style.actors_item_title}>
                Hero: {index.character}
              </h3>
              <p>Actor: {index.name}</p>
              <img
                src={`https://image.tmdb.org/t/p/w200${index.profile_path}`}
                alt="Photo_of_Actor"
              />
            </div>
          ))}
      </div>
    );
  }
}
