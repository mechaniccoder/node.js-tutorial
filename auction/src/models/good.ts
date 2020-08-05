/* eslint-disable implicit-arrow-linebreak */
export default (sequelize: any, DataTypes: any) =>
  sequelize.define(
    'good',
    {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
