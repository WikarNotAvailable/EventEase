import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { NavSearch } from "./NavSearch";
import { SingUpModal } from "./modals/SignUpModal";
import { SingInModal } from "./modals/SingInModal";
import { NavLink } from "./NavLink";
import { NavProfile } from "./NavProfile";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const {
    isOpen: isSignInOpen,
    onOpen: onSingInOpen,
    onClose: onSignInClose
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSingUpOpen,
    onClose: onSignUpClose
  } = useDisclosure();

  return (
    <Flex
      p={{ base: "20px 16px", md: "20px 42px", xl: "20px 156px" }}
      bgColor="backgroundPrimary"
      align="center"
      boxShadow="0px 1px 10px -2px rgba(154, 154, 154, 1)"
      w="100vw"
      maxW="100vw"
      justify="space-between"
    >
      <SingUpModal
        isOpen={isSignUpOpen}
        onOpen={onSingUpOpen}
        onClose={onSignUpClose}
        isAnotherOpen={isSignInOpen}
        onAnotherClose={onSignInClose}
        onAnotherOpen={onSingInOpen}
      />
      <SingInModal
        isOpen={isSignInOpen}
        onOpen={onSingInOpen}
        onClose={onSignInClose}
        isAnotherOpen={isSignUpOpen}
        onAnotherClose={onSignUpClose}
        onAnotherOpen={onSingUpOpen}
      />
      <Text fontSize="24px" fontWeight="600" color="primary">
        EventEase
      </Text>
      <Flex align="center" gap="16px">
        <Link to="/events">
          <NavLink text="Events" />
        </Link>
        <NavLink text="Artists" />
        <NavLink text="Places" />
        <NavSearch />
        <NavProfile signInOpen={onSingInOpen} signUpOpen={onSingUpOpen} />
      </Flex>
    </Flex>
  );
};
