import db from './models';

const { User, Good, Auction, sequelize } = db;

export default async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() + 1);

    const targets = Good.findAll({
      where: {
        soldId: null,
        createdAt: { $lte: yesterday },
      },
    });

    targets.forEach(async (target: typeof targets) => {
      const success = await Auction.findOne({
        where: {
          goodId: target.id,
          order: [['bid', 'DESC']],
        },
      });
      await Good.update(
        { soldId: success.userId },
        { where: { id: target.id } },
      );
      await User.update(
        { money: sequelize.literal(`money - ${success.bid}`) },
        { where: { id: success.id } },
      );
    });
  } catch (err) {
    console.error(err);
  }
};
