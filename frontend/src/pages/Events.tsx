import { Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { EventListItem } from "../components/pages/events/EventListItem";
import { PageContainer } from "../components/shared/containers/PageContainer";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const getEvents = async () => {
    setLoading(true);
    const res = await api.getEvents();
    if (res.status === 200) {
      console.log(res.data);
      setEvents(res.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast({
        title: "Something went wrong...",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top"
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <PageContainer isCentered>
      {loading && <Spinner />}
      {!loading && (
        <Flex w="100%" flexDir="column" gap="16px">
          {events.map((event: any) => (
            <Link to={`/events/${event.event_id}`} key={event.event_id}>
              <EventListItem event={event} />
            </Link>
          ))}
        </Flex>
      )}
    </PageContainer>
  );
};
