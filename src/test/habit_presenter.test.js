import HabitPresenter from '../habit_presenter';

describe('habit_presenter', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 1 },
    { id: 2, name: 'Running', count: 0 },
  ];
  const update = jest.fn();
  let presenter = null;

  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    jest.clearAllMocks();
  });

  it('inits with habits', () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it('increases habit count and call update callback', () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled(1);
  });

  it('decreases habit count and call update callback', () => {
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled(1);
  });

  it('does not set the count value below zero when decrements', () => {
    presenter.decrement(presenter.getHabits()[0], update);
    presenter.decrement(presenter.getHabits()[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled(2);
  });

  it('deletes habit from the list', () => {
    const secondItem = presenter.getHabits()[1];
    presenter.delete(habits[0], update);

    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0]).toEqual(secondItem);
    checkUpdateIsCalled(1);
  });

  it('adds new habit to the list', () => {
    presenter.add('Eating', update);

    expect(presenter.getHabits()[2].name).toBe('Eating');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled(1);
  });

  it('throws an error when the habits limit is exceeded', () => {
    presenter.add('Learning', update);

    expect(() => presenter.add('Exercise', update)).toThrow('count of habits cannot exceeds 3');
  });

  describe('reset', () => {
    it('set all habit counts to 0', () => {
      presenter.reset(update);

      expect(presenter.getHabits().every((habit) => habit.count === 0)).toBeTruthy();
    });
  });

  function checkUpdateIsCalled(times) {
    expect(update).toHaveBeenCalledTimes(times);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
