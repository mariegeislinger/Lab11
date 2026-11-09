const { Sequelize } = require('sequelize')

// How to connect to the database, what type of database
const configuration = {
    'storage': 'feedback.sqlite',
    'dialect': 'sqlite'
}

// New Sequelize object
const sequelizeDatabase = new Sequelize(configuration)

// Get the feedback model and call the function to create it, for this database
const createFeedbackModel = require('./feedback')
const feedbackModel = createFeedbackModel(sequelizeDatabase)

const models = {}

// An app could have several models, add them to an object,
// using their name as the property
models[feedbackModel.name] = feedbackModel

module.exports = models
