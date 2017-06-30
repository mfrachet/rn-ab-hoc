import React from 'react';
import { View, Text } from 'react-native';
import ReactNativeAbHoc, { onChooseVariant } from './../reactNativeAbHoc';

/** @test {ReactNativeAbHoc} */
describe('ReactNativeAbHoc', () => {
  let A;
  let B;
  let C;

  beforeEach(() => {
    A = () => (<View><Text>A</Text></View>);
    B = () => (<View><Text>B</Text></View>);
    C = () => (<View><Text>C</Text></View>);
  });

  it('should have return the first component if we force the render', () => {
    const component = ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
    )({ variant: 'A' });
    expect(component).toEqual(<A variant="A" />);
  });

  it('should have thrown an error if the variant varianted doesnt exist', () => {
    expect(() => ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
    )({ variant: 'C' })).toThrow('The variant named "C" doesn\'t exist in the current experient "Experiment');
  });

  it('should have a random position (mocked by 1) when calling it without variant', () => {
    Math.random = jest.fn().mockImplementation(() => 1);
    const component = ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
    )();
    expect(component).toEqual(<B variant={null} />);
  });


  it('should have returned the second component', () => {
    Math.random = jest.fn().mockImplementation(() => 0.4);
    const component = ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
      { variant: 'C', component: C },
    )();
    expect(component).toEqual(<B variant={null} />);
  });

  it('should have returned the first component', () => {
    Math.random = jest.fn().mockImplementation(() => 0.1);
    const component = ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
      { variant: 'C', component: C },
    )();
    expect(component).toEqual(<A variant={null} />);
  });

  it('should have returned the last component', () => {
    Math.random = jest.fn().mockImplementation(() => 0.9);
    const component = ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
      { variant: 'C', component: C },
    )();
    expect(component).toEqual(<C variant={null} />);
  });

  /* Part concerning the EventEmitter */
  it('should have emit an event containing the variant', async () => {
    await onChooseVariant((variant) => {
      expect(variant).toEqual({ variant: 'A', component: A });
    });
    ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
    )({ variant: 'A' });
  });
});
