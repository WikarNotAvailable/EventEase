import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../../../pages/Home";
import { Flex } from "@chakra-ui/react";
import { ScrollToTop } from "../../shared/scrollToTop/ScrollToTop";
import { Error } from "../../../pages/Error";
import { Navbar } from "../navbar/Navbar";
import { Events } from "../../../pages/Events";
import { Performer } from '../../../pages/Performer';
import { Artists } from '../../../pages/Artists';

export const Wrapper = () => {
  const pages = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/events",
      element: <Events />
    },
    {
      path: "/events/:id",
      element: <>event details</>
      path: '/artists',
      element: <Artists/>
    },
    {
      path: '/artists/:name',
      element: <Performer/>
    }
  ].map((element, index) => ({ ...element, id: `${element.path}_${index}` }));

  return (
    <Flex flexWrap="wrap" direction="column">
      <BrowserRouter>
        <Flex>
          <Navbar />
        </Flex>
        <ScrollToTop>
          <Routes>
            {pages.map(({ path, element, id }) => (
              <Route path={path} element={element} key={id} />
            ))}
            <Route path="*" element={<Error />} key="*" />
          </Routes>
        </ScrollToTop>
        {/* <Footer /> */}
      </BrowserRouter>
    </Flex>
  );
};
