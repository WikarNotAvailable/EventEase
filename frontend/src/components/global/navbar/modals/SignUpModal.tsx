import { Button, Flex, Link, Text, useToast } from "@chakra-ui/react";
import React, { FC, useReducer, useState } from "react";
import api from "../../../../api/api";
import { Input } from "../../../shared/Input";
import { GlobalModal } from "../../modal/Modal";
import { signUpReducer } from "../reducers/signUpReducer";
import { SingInModal } from "./SingInModal";

interface ISignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isAnotherOpen: boolean;
  onAnotherClose: () => void;
  onAnotherOpen: () => void;
}

export const SingUpModal: FC<ISignUpModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  isAnotherOpen,
  onAnotherClose,
  onAnotherOpen
}) => {
  const [formState, dispatchForm] = useReducer(signUpReducer, {
    firstNameValue: "",
    surnameValue: "",
    dateOfBirthValue: "",
    phoneNumberValue: "",
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordConfirmationValid: false,
    emailValue: "",
    passwordValue: "",
    passwordConfirmationValue: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!formState.isEmailValid) setErrorMessage("Incorrect email");
    else if (!formState.isPasswordValid)
      setErrorMessage(
        "Incorrect password. It should be minimum 7 characters long"
      );
    else if (!formState.isPasswordConfirmationValid)
      setErrorMessage("Passwords do not match");
    else {
      dispatchForm({ type: "FORM_SUBMIT" });
      setErrorMessage("");
      setIsLoading(true);
      const data = {
        userTypeID: 3,
        name: formState.firstNameValue,
        surname: formState.surnameValue,
        email: formState.emailValue,
        phoneNumber: formState.phoneNumberValue,
        birthday: formState.dateOfBirthValue,
        password: formState.passwordValue
      };
      api
        .postUser(data)
        .then((res: any) => {
          console.log(res);
          setIsLoading(false);
          toast({
            title: "Successfully signed up. Now you can login.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top"
          });
          onClose();
        })
        .catch((err: any) => {
          console.log(err);
          setIsLoading(false);
          toast({
            title: "Something went wrong...",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top"
          });
        });
      onClose();
    }
  };

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} headerText="Sign up">
      <SingInModal
        isOpen={isAnotherOpen}
        onClose={onAnotherClose}
        onOpen={onAnotherOpen}
        isAnotherOpen={isOpen}
        onAnotherClose={onClose}
        onAnotherOpen={onOpen}
      />
      <Flex flexDir="column" gap="16px">
        <Flex justify="space-between" w="100%">
          <Input
            width="45%"
            heading="First name"
            type="text"
            onChange={(e: any) =>
              dispatchForm({ type: "FIRSTNAME_CHANGE", val: e.target.value })
            }
          />
          <Input
            width="45%"
            heading="Surname"
            type="text"
            onChange={(e: any) =>
              dispatchForm({ type: "SURNAME_CHANGE", val: e.target.value })
            }
          />
        </Flex>
        <Flex justify="space-between" w="100%">
          <Input
            width="45%"
            heading="Date of birth"
            type="date"
            onChange={(e: any) =>
              dispatchForm({ type: "BIRTH_DATE_CHANGE", val: e.target.value })
            }
          />
          <Input
            width="45%"
            heading="Phone number"
            type="tel"
            onChange={(e: any) =>
              dispatchForm({ type: "PHONE_NUMBER_CHANGE", val: e.target.value })
            }
          />
        </Flex>
        <Input
          width="100%"
          heading="Email"
          type="email"
          onChange={(e: any) =>
            dispatchForm({ type: "EMAIL_CHANGE", val: e.target.value })
          }
        />
        <Input
          width="100%"
          heading="Password"
          type="password"
          onChange={(e: any) =>
            dispatchForm({ type: "PASSWORD_CHANGE", val: e.target.value })
          }
        />
        <Input
          width="100%"
          heading="Repeat password"
          type="password"
          onChange={(e: any) =>
            dispatchForm({
              type: "PASSWORD_CONFIRMATION_CHANGE",
              val: e.target.value
            })
          }
        />
        {errorMessage !== "" && (
          <Text fontSize="12px" color="red">
            {errorMessage}
          </Text>
        )}
        <Text fontSize="12px" w="100%" textAlign="center">
          Already have an account?{" "}
          <Link
            color="#696F8C"
            onClick={() => {
              onClose();
              onAnotherOpen();
            }}
          >
            Log in
          </Link>
        </Text>
        <Button
          isLoading={isLoading}
          mt="16px"
          borderRadius="20px"
          color="white"
          bgColor="primary"
          _hover={{ bgColor: "primary", opacity: "0.9" }}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </Flex>
    </GlobalModal>
  );
};
