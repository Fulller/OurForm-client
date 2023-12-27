import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile, refreshToken } from "../services/user.service";
import { intervalRefreshToken } from "../configs";
import userSlide from "../redux/slides/user.slide.js";
import { getAuthUrl } from "../tools/url.tool";
import { useLocation } from "react-router-dom";
import publicRoutes from "../routes/public.route";
import _ from "lodash";

const useAuthentication = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let intervalId;
    const pathname = location.pathname;
    const isPathInRoutes = _.some(publicRoutes, { path: pathname });
    const return_uri = window.location.href;
    if (!isPathInRoutes) {
      const authenticateUser = async () => {
        try {
          await refreshToken();
          const user = await getProfile();
          if (user) {
            intervalId = setInterval(async () => {
              try {
                await refreshToken();
              } catch {
                clearInterval(intervalId);
                dispatch(userSlide.actions.setUser(null));
                window.location.href = getAuthUrl(
                  "/google?return_uri=" + return_uri
                );
              }
            }, intervalRefreshToken);
          } else {
            throw new Error();
          }
          dispatch(userSlide.actions.setUser(user));
        } catch {
          dispatch(userSlide.actions.setUser(null));
          window.location.href = getAuthUrl("/google?return_uri=" + return_uri);
        }
      };
      authenticateUser();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dispatch, location]);

  return null;
};

export default useAuthentication;
