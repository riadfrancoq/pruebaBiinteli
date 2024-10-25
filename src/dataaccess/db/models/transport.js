import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class transport extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FlightCarrier: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    FlightNumber: {
      type: DataTypes.CHAR(4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transport',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
