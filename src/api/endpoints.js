import axios from "axios";
import db from "../dataaccess/db/db.js";
import { fn, col, literal, Op } from "sequelize";
const {tables} = db;
const { JourneyFlight , journey , flight , transport } = tables;

const collectData = async () => {
    try {
        let data = (await axios.get('https://bitecingcom.ipage.com/testapi/avanzado.js')).data.replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');;
        const dataJson = JSON.parse(data).map(e=> {
            return {
                origin: e.DepartureStation,
                destination :e.ArrivalStation,
                FlightCarrier: e.FlightCarrier,
                FlightNumber: e.FlightNumber,
                price : e.Price
            };
        });


        return dataJson;        
    } catch (error) {
        console.log(error);
        return [];
    }

};

export const uploadData = async (req, res) => {
    try {

        const data = await collectData();

        await transport.bulkCreate(data, {validate: true});

        const transports = await transport.findAll({
            attributes: ['id', 'FlightNumber'],
            raw: true
        });

        const transportMap = transports.reduce((map, transport) => {
            map[transport.FlightNumber] = transport.id; 
            return map;
        }, {});

        const mergedData = data.map(flight => {
            const transportId = transportMap[flight.FlightNumber];
            return {
                ...flight, 
                transport: transportId 
            };
        });

        await flight.bulkCreate(mergedData, {validate: true});

        return res.status(200).json({
            result: "Datos enviados a la base de datos correctamente"
        });
    } catch (error) {
        
    console.log(error);
    res.status(404).json({
        message: "Oops Algo salio Mal"
    });

    }
};

export const journeyManager = async (req, res) => {
try {
    const {DepartureStation, ArrivalStation} = req.body;


    const searchJourney = await journey.findOne({ where: { origin: DepartureStation, destination: ArrivalStation } });

    if (searchJourney.length === 0) { 

        const flights = await flight.findAll({
            where: {
                origin: DepartureStation,
                destination: ArrivalStation
            }
        });
        
    } else {
        const journeyData = await journey.findAll({
            include: [
                {
                    model: JourneyFlight,
                    as: "JourneyFlights",
                    include: {
                        model: flight,
                        as: "flight_flight",
                        attributes: ["origin", "destination", "price"]
                    }
                }
            ]
        });

        res.status(200).json({
            result: journeyData
        });
    }

    
   



} catch (error) {
    console.log(error);
    res.status(404).json({
        message: "Oops Something went wrong"
    });
}
};