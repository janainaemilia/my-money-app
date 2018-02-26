const User = require('./user')
const errorHandler = require('../common/errorHandler')

User.methods(['get', 'post', 'put', 'delete']) // Métodos que serão interceptados pela API
User.updateOptions({ new: true, runValidators: true }) // Configuração para o mongo retornar o dado novo numa atualização, e aplicar as validações
User.after('post', errorHandler).after('put', errorHandler)

module.exports = User