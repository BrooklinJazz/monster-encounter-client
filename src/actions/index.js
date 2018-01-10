export function selectMonster(monster) {
  // selectMonster is an ActionCreator, it needs to return an action,
  // an object with a type property
  console.log('a monster was selected:', monster.Name);
  return {
    type: 'MONSTER_SELECTED',
    payload: monster
  };
}
