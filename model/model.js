const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    'postgres://cqsxwkvc:9i6ohxAwZ4oh1y1NDBf8sWgMUbSW_Ipy@jelani.db.elephantsql.com/cqsxwkvc'
);

const BotSubscribers = sequelize.define('subscribers', {
    chatId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: false },
});

module.exports = {
    BotSubscribers,
    sequelize,
};
