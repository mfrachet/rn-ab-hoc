import React from 'react';

const displayComponentFromVariant = (variant, props) => (
  <variant.component {...props} />
);

export default (experiment, ...variants) => (props = { variant: null }) => {
  const { variant } = props;
  if (variant) {
    const chosenVariant = variants.find(v => v.variant === variant);
    if (!chosenVariant) {
      throw new Error(`The variant named "${variant}" doesn't exist in the current experient "${experiment}"`);
    }
    return displayComponentFromVariant(chosenVariant, props);
  }
  const random = Math.random() * (variants.length - 1);
  const index = Math.round(random, 10);
  const randomVariant = variants[index];
  return displayComponentFromVariant(randomVariant, props);
};
