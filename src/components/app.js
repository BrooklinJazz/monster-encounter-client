import React from 'react';
import { Component } from 'react'

import MonsterList from '../containers/monster-list';
import MonsterDetail from '../containers/monster-detail';


export default class App extends Component {
  render() {
    return (
      <div>
        <MonsterList />
        <MonsterDetail />
      </div>
    );
  }
}
