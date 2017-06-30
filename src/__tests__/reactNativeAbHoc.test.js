import React from 'react';
import { shallow } from 'enzyme';
import { View, Text, AsyncStorage } from 'react-native';
import ReactNativeAbHoc from './../reactNativeAbHoc';

/** @test {ReactNativeAbHoc} */
describe('ReactNativeAbHoc', () => {
  let A;
  let B;
  let C;
  let Component;

  beforeEach(() => {
    const setItem = () => Promise.resolve('setItem');
    const getItem = () => Promise.resolve('A');
    jest.setMock('AsyncStorage', { setItem: jest.fn(setItem), getItem: jest.fn(getItem) });

    A = () => (<View><Text>A</Text></View>);
    B = () => (<View><Text>B</Text></View>);
    C = () => (<View><Text>C</Text></View>);

    Component = ReactNativeAbHoc('Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
      { variant: 'C', component: C },
    );
  });

  describe('componentWillMount', () => {
    it('should have called the persistVariant with the A variant', () => {
      const wrapper = shallow(<Component variant="A" />);
      const instance = wrapper.instance();
      instance.persistVariant = jest.fn();
      instance.componentWillMount();
      expect(instance.persistVariant).toHaveBeenCalledWith({ variant: 'A', component: A });
    });

    it('should have thrown an error if the variant variant doesnt exist', () => {
      expect(() => shallow(<Component variant="X" />)).toThrow('The variant named "X" doesn\'t exist in the current experient "Experiment');
    });

    it('should have returned the second component', () => {
      Math.random = jest.fn().mockImplementation(() => 0.4);
      const wrapper = shallow(<Component />);
      const instance = wrapper.instance();
      instance.shouldPersist = jest.fn();
      instance.componentWillMount();
      expect(instance.shouldPersist).toHaveBeenCalledWith({ variant: 'B', component: B });
    });

    it('should have returned the first component', () => {
      Math.random = jest.fn().mockImplementation(() => 0.1);
      const wrapper = shallow(<Component />);
      const instance = wrapper.instance();
      instance.shouldPersist = jest.fn();
      instance.componentWillMount();
      expect(instance.shouldPersist).toHaveBeenCalledWith({ variant: 'A', component: A });
    });

    it('should have returned the last component', () => {
      Math.random = jest.fn().mockImplementation(() => 0.9);
      const wrapper = shallow(<Component />);
      const instance = wrapper.instance();
      instance.shouldPersist = jest.fn();
      instance.componentWillMount();
      expect(instance.shouldPersist).toHaveBeenCalledWith({ variant: 'C', component: C });
    });
  });

  describe('persistVariant', () => {
    it('should have called the AsyncStorage setItem if the variant is forced ', async () => {
      const instance = shallow(<Component variant="B" />).instance();
      // Reset the mock called in shallow
      AsyncStorage.setItem.mockClear();
      await instance.persistVariant({ variant: 'B', component: B });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('abhoc-variant-Experiment', 'B');
    });

    it('should have called the component setState with "variant" and "B" ', async () => {
      const instance = shallow(<Component variant="B" />).instance();
      // Reset the mock called in shallow
      AsyncStorage.setItem.mockClear();
      instance.setState = jest.fn();
      await instance.persistVariant({ variant: 'B', component: B });
      expect(instance.setState).toHaveBeenCalledWith({ variant: 'B', component: B });
    });
  });

  describe('shouldPersist', () => {
    it('shouldnt have called the persist method if something as been obtained from the storage ', async () => {
      Math.random = jest.fn().mockImplementation(() => 0.1);
      AsyncStorage.setItem.mockClear();
      const instance = shallow(<Component />).instance();
      instance.persistVariant = jest.fn();
      await instance.shouldPersist({ variant: 'B', component: B });
      expect(instance.persistVariant).not.toHaveBeenCalled();
    });

    it('should have called the persist method if nothing in the storage ', async () => {
      Math.random = jest.fn().mockImplementation(() => 0.1);
      AsyncStorage.setItem.mockClear();
      const getItem = () => Promise.resolve(null);
      AsyncStorage.getItem = getItem;
      const instance = shallow(<Component />).instance();
      instance.persistVariant = jest.fn();
      await instance.shouldPersist({ variant: 'B', component: B });
      expect(instance.persistVariant).toHaveBeenCalledWith({ variant: 'B', component: B });
    });
  });
});
