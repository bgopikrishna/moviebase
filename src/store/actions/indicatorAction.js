export const doToggleIndicator = (type, bol, errorMsg = "") => ({
  type,
  bol,
  errorMsg
});

export const applyLoadingIndicator = (state, action) => {
  const { bol } = action;

  return {
    ...state,
    isLoading: bol
  };
};

export const applyErrorIndicator = (state, action) => {
  const { bol, errorMsg } = action;
  return {
    ...state,
    isError: bol,
    errorMsg
  };
};
