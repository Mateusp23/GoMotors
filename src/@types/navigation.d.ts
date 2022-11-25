export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signIn: undefined;
      registerUser: undefined;
      homeMotoboy: {
        userData: {
          id: string,
          name: string,
          selectTypeUser: string,
      } };
      homeRestaurant: {
        userData: {
          id: string,
          name: string,
          selectTypeUser: string,
      } };
      editMotoboy: { id: {
        userData: {
          id: string,
          }
        }
      };
      editRestaurant: {
        id: {
          userData: {
            id: string,
          }
        }
      };
      loading: undefined;
      motoboyDetails: { orderIdMotoboy: string };
    }
  }
}