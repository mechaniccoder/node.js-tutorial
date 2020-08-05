/* eslint-disable implicit-arrow-linebreak */
export default (sequelize: any, DataTypes: any) =>
  sequelize.define(
    'auction',
    {
      bid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      msg: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
