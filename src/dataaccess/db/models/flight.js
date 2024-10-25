import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class flight extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transport',
        key: 'id'
      }
    },
    origin: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    destination: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'flight',
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
        name: "transport",
        using: "BTREE",
        fields: [
          { name: "transport" },
        ]
      },
    ]
  });
  }
}
