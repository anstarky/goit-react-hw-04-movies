import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';
import style from './Navigation.module.css';

const Navigation = () => (
  <ul className={style.list}>
    <li className={style.item}>
      <NavLink
        exact
        to={routes.HOME}
        className={style.item_link}
        activeClassName={style.item_link_active}
      >
        Home
      </NavLink>
    </li>
    <li className={style.item}>
      <NavLink
        to={routes.MOVIES}
        className={style.item_link}
        activeClassName={style.item_link_active}
      >
        Movies
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
