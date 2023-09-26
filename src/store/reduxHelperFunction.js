export const generateCartHelper = (currentCart, item) => {
  return [{...item, quantity: 1}];
};
export const addToCartHelper = (currentCart, item) => {
  const findIndex = currentCart?.findIndex(child => child._id == item?._id);

  if (findIndex !== -1) {
    let allItem = [...currentCart];
    allItem[findIndex] = {
      ...allItem[findIndex],
      quantity: allItem[findIndex].quantity + 1,
    };
    return [...allItem];
  } else {
    return [...currentCart, {...item, quantity: 1}];
  }
};

export const removeFromCartHelper = (currentCart, item) => {
  const findIndex = currentCart?.findIndex(child => child._id == item?._id);

  if (findIndex !== -1) {
    let filter = currentCart?.filter(child => child._id !== item?._id);

    let matchChild = currentCart[findIndex];

    if (matchChild?.quantity > 1) {
      return [...filter, {...matchChild, quantity: matchChild.quantity - 1}];
    } else {
      return [...filter];
    }
  }
};
