import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class JourneyFlight extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    journey: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'journey',
        key: 'id'
      }
    },
    flight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'flight',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'JourneyFlight',
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
      {
        name: "journey",
        using: "BTREE",
        fields: [
          { name: "journey" },
        ]
      },
      {
        name: "flight",
        using: "BTREE",
        fields: [
          { name: "flight" },
        ]
      },
    ]
  });
  }
}
