import { useState } from "react";

export default function useEvents(initial){
  const [events, setEvents] = useState(initial);
  return { events, setEvents };
}