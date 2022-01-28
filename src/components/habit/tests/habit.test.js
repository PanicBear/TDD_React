import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Habit from '../../habit/habit';

describe('Habit', () => {
  const habit = { name: 'Habit', count: 4 };
  let habitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    habitComponent = <Habit habit={habit} onIncrement={onIncrement} onDecrement={onDecrement} onDelete={onDelete} />;
  });

  it('renders', () => {
    const component = renderer.create(habitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Button Click', () => {
    beforeEach(() => {
      render(habitComponent);
    });

    it('calls onIncrement when clicking "increment" button', () => {
      const button = screen.getByTitle('increase');
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it('calls onDecrement when clicking "decrement" button', () => {
      const button = screen.getByTitle('decrease');
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it('calls onDelete when clicking "delete" button', () => {
      const button = screen.getByTitle('delete');
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
