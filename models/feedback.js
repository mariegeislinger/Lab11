const { DataTypes } = require('sequelize')

module.exports = (sequelizeDatabase) => {

    const Feedback = sequelizeDatabase.define(
        'Feedback',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },

            email: {
                type: DataTypes.STRING,
                allowNull: true
            },

            isCurrentStudent: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },

            comments: {
                type: DataTypes.STRING,
                allowNull: false
            },

            departments: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            }
        }
    )

    Feedback.sync({ force: false })
        .then(() => console.log('Synced feedback table'))

    return Feedback
}