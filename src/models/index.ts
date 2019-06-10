import config from 'config'
import { Sequelize } from 'sequelize-typescript'

const dbConfig: any = Object.assign({}, config.get('database'), {
  modelPaths: [__dirname + '/**/*.model.ts', __dirname + '/**/*.model.js'],
})
const sequelize = new Sequelize(dbConfig)
sequelize.sync({ force: false })

export { sequelize }
export { Sequelize }
export default sequelize.models
