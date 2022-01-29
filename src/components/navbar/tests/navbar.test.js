import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from '../navbar';

describe('Navbar', () => {
  it('renders', () => {
    const component = renderer.create(<Navbar totalCount={0} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
