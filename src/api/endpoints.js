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

    const flights = await flight.findAll({
        where: {
            DepartureStation
        },
        include: [{
            model: flight, 
            as: 'connections',
            where: {
                DepartureStation: {
                    [Op.ne]: DepartureStation, 
                },
                ArrivalStation
            },
            required: false, 
            include: {
                model: transport,
                attributes: ['FlightCarrier', 'FlightNumber'],
            }
        }],
    });
    return res.status(200).json({
        result: flights});
} catch (error) {
    console.log(error);
    res.status(404).json({
        message: "Oops Something went wrong"
    });
}
};