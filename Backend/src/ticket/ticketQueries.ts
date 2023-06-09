export const addTicket = "INSERT INTO tickets (tickettype_id,event_id,transaction_id,price,ticket_place,isavailable) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
export const checkTicketTypeExists = "SELECT * FROM tickettypes WHERE tickettype_id = $1";
export const checkEventExists = "SELECT * FROM events WHERE event_id = $1";
export const checkTransactionExists = "SELECT * FROM transactions WHERE transaction_id = $1"
export const getTickets = "SELECT * FROM tickets INNER JOIN tickettypes on tickets.tickettype_id = tickettypes.tickettype_id";
export const getTicketById = "SELECT * FROM tickets INNER JOIN tickettypes on tickets.tickettype_id = tickettypes.tickettype_id WHERE ticket_id = $1";
export const deleteTicket = "DELETE FROM tickets WHERE ticket_id = $1";
export const updateTicket = "UPDATE tickets SET price = $1, isavailable = $2, transaction_id = $3 WHERE ticket_id = $4 RETURNING *";
export const getEventForTicket = "SELECT * FROM events WHERE event_id = $1";
export const getTransactionForTicket = "SELECT * FROM transactions INNER JOIN transactionstatuses on transactionstatuses.transactionstatus_id = transactions.transactionstatus_id WHERE transaction_id = $1";
export const getAvailableTickets = "SELECT availabletickets FROM events WHERE events.event_id = $1";
export const getCurrentlyTakenTickets = "SELECT currentlytakentickets FROM events WHERE events.event_id = $1";
export const changeCurrentlyTakenAndAvailableTickets = "UPDATE events SET availabletickets = $1, currentlytakentickets = $2 WHERE event_id = $3";
export const getTicketsCount = "SELECT COUNT(ticket_id) as ticketscount FROM tickets WHERE event_id = $1";
export const getMaxTicketPlace = "SELECT MAX(ticket_place) as maxplace FROM tickets WHERE event_id = $1";
export const getTransactionByID = "SELECT * FROM transactions WHERE transaction_id = $1";
export const getTicketsForEvent = "SELECT * FROM tickets INNER JOIN tickettypes on tickettypes.tickettype_id = tickets.tickettype_id WHERE event_id = $1 AND price = $2";
export const getAllTicketsForEvent = "SELECT * FROM tickets INNER JOIN tickettypes on tickettypes.tickettype_id = tickets.tickettype_id WHERE event_id = $1";