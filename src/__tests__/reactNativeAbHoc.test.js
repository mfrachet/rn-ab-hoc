import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import ReactNativeAbHoc, { noop } from './../reactNativeAbHoc';

const getWrapper = (Component, props = {}) => shallow(<Component {...props} />);

/** @test {ReactNativeAbHoc} */
describe('ReactNativeAbHoc', () => {
  let A;
  let B;
  let C;
  let Component;
  let spyOnSelectVariant;

  beforeEach(() => {
    const asyncMap = {};
    const getItem = key => Promise.resolve(asyncMap[key]);
    const setItem = (key, variant) => {
      asyncMap[key] = variant;
      Promise.resolve(variant);
    };

    AsyncStorage.setItem = jest.fn(setItem);
    AsyncStorage.getItem = jest.fn(getItem);
  });

  afterEach(() => {
    AsyncStorage.setItem.mockReset();
    AsyncStorage.getItem.mockReset();
  });

  beforeEach(() => {
    spyOnSelectVariant = jest.fn();
    A = () => (
      <View>
        <Text>A</Text>
      </View>
    );
    B = () => (
      <View>
        <Text>B</Text>
      </View>
    );
    C = () => (
      <View>
        <Text>C</Text>
      </View>
    );

    Component = ReactNativeAbHoc(
      'Experiment',
      { variant: 'A', component: A },
      { variant: 'B', component: B },
      { variant: 'C', component: C },
    );
  });

  describe('ReactNativeAbHoc#findVariant', () => {
    it('should have found the variant', () => {
      expect(Component.findVariant('A')).toEqual({ variant: 'A', component: A });
    });

    it('should have throw an error if the variant is not found', () => {
      expect(() => Component.findVariant('x')).toThrow(
        'The variant named "x" doesn\'t exist in the current experiment "Experiment"',
      );
    });
  });

  describe('ReactNativeAbHoc#randomizeVariant', () => {
    it('should return component A', () => {
      Math.random = jest.fn().mockImplementation(() => 0.2);
      expect(Component.randomizeVariant()).toEqual({ variant: 'A', component: A });
    });

    it('should return component B', () => {
      Math.random = jest.fn().mockImplementation(() => 0.5);
      expect(Component.randomizeVariant()).toEqual({ variant: 'B', component: B });
    });

    it('should return component C', () => {
      Math.random = jest.fn().mockImplementation(() => 0.8);
      expect(Component.randomizeVariant()).toEqual({ variant: 'C', component: C });
    });
  });

  describe('ReactNativeAbHoc#lifecycle', () => {
    it('should return null on noop default function', () => expect(noop()).toEqual(null));

    it('should render a forced component', async () => {
      const wrapper = await getWrapper(Component, {
        variant: 'B',
        onVariantSelect: spyOnSelectVariant,
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('abhoc-variant-Experiment', 'B');
      expect(spyOnSelectVariant).toHaveBeenCalledWith('B');
      expect(wrapper.state()).toEqual({ variant: 'B', component: B });
      expect(wrapper.find(View).prop('variant')).toEqual('B');
    });

    it('should render a random component', async (done) => {
      Math.random = jest.fn().mockImplementation(() => 0.8);
      const wrapper = await getWrapper(Component, {
        simpleProps: 'test',
        onVariantSelect: spyOnSelectVariant,
      });
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('abhoc-variant-Experiment');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('abhoc-variant-Experiment', 'C');
      expect(wrapper.find(View).prop('simpleProps')).toEqual('test');
      setTimeout(() => {
        expect(spyOnSelectVariant).toHaveBeenCalledWith('C');
        expect(wrapper.state()).toEqual({ variant: 'C', component: C });
        done();
      }, 0);
    });

    it('should render a random (existing) component', async (done) => {
      Math.random = jest.fn().mockImplementation(() => 0.8);
      AsyncStorage.setItem('abhoc-variant-Experiment', 'C');
      AsyncStorage.setItem.mockReset();
      const wrapper = await getWrapper(Component, {
        simpleProps: 'test',
        onVariantSelect: spyOnSelectVariant,
      });
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('abhoc-variant-Experiment');
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(wrapper.find(View).prop('simpleProps')).toEqual('test');
      setTimeout(() => {
        expect(spyOnSelectVariant).toHaveBeenCalledWith('C');
        expect(wrapper.state()).toEqual({ variant: 'C', component: C });
        done();
      }, 0);
    });
  });
});
