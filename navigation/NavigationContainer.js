import React, { useEffect, useRef } from "react";
import ShopNavigator from "./Navigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "AuthNavigator" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
