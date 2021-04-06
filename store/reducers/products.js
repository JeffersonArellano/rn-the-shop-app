import data from '../../data/dummy-data';

const initialState = {
  availableProducts: data.PRODUCTS,
  userProducts: data.PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  return state;
};
