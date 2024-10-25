import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _JourneyFlight from  "./JourneyFlight.js";
import _flight from  "./flight.js";
import _journey from  "./journey.js";
import _transport from  "./transport.js";

export default function initModels(sequelize) {
  const JourneyFlight = _JourneyFlight.init(sequelize, DataTypes);
  const flight = _flight.init(sequelize, DataTypes);
  const journey = _journey.init(sequelize, DataTypes);
  const transport = _transport.init(sequelize, DataTypes);

  JourneyFlight.belongsTo(flight, { as: "flight_flight", foreignKey: "flight"});
  flight.hasMany(JourneyFlight, { as: "JourneyFlights", foreignKey: "flight"});
  JourneyFlight.belongsTo(journey, { as: "journey_journey", foreignKey: "journey"});
  journey.hasMany(JourneyFlight, { as: "JourneyFlights", foreignKey: "journey"});
  flight.belongsTo(transport, { as: "transport_transport", foreignKey: "transport"});
  transport.hasMany(flight, { as: "flights", foreignKey: "transport"});
  return {
    JourneyFlight,
    flight,
    journey,
    transport,
  };
}
