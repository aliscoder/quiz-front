import { useGetShopQuery } from "@state/api/auth";
import { EXPO_PUBLIC_APP_ID } from "@utils";

const useShop = () => {
  const { data, isLoading, isSuccess, isError } = useGetShopQuery(EXPO_PUBLIC_APP_ID);

  return { ...data, isLoading, isSuccess, isError };
};

export default useShop;
