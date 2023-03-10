export const shadowGlobal = {
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
};

export const marginGlobalHorizontal = {
  marginHorizontal: 20,
};

export const marginGlobalVertical = {
  marginVertical: 10,
};

export const borderRadiusGlobal = {
  borderRadius: 6,
};

export const btnSendGlobal = {
  padding: 20,
  ...borderRadiusGlobal,
  ...shadowGlobal,
};

export const bottonTabNavigatorStyleGlobal = {
  position: 'absolute',
  bottom: 25,
  left: 20,
  right: 20,
  ...borderRadiusGlobal,
  ...shadowGlobal,
  borderTopWidth: 0,
  opacity: 0.9,
};
